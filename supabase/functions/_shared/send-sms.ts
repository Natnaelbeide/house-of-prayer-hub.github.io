// Server-only: sends text messages through Clearstream.
// Reads CLEARSTREAM_API_KEY — never expose to the browser.

const CLEARSTREAM_BASE = 'https://api.getclearstream.com/v1'

/** Normalizes a US phone number to E.164 (+1XXXXXXXXXX). Returns null if unusable. */
export function normalizePhone(raw: string | null | undefined): string | null {
  if (!raw) return null
  const digits = String(raw).replace(/\D/g, '')
  if (digits.length === 10) return `+1${digits}`
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`
  if (String(raw).trim().startsWith('+') && digits.length >= 8) return `+${digits}`
  return null
}

export type SendSmsResult = { sent: boolean; reason?: string }

function headers(apiKey: string) {
  return {
    'X-Api-Key': apiKey,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
}

/**
 * Clearstream only texts subscribers that exist in the account and are opted in,
 * so make sure the number is a known, active subscriber first.
 */
async function ensureSubscriber(apiKey: string, phone: string, fullName?: string) {
  const activate = () =>
    fetch(`${CLEARSTREAM_BASE}/subscribers/${encodeURIComponent(phone)}`, {
      method: 'PUT',
      headers: headers(apiKey),
      body: JSON.stringify({ status: 'ACTIVE' }),
    })

  let response = await activate()
  if (response.status === 404) {
    const [first, ...rest] = (fullName ?? '').trim().split(/\s+/)
    const create = await fetch(`${CLEARSTREAM_BASE}/subscribers`, {
      method: 'POST',
      headers: headers(apiKey),
      body: JSON.stringify({
        mobile_number: phone,
        ...(first ? { first_name: first } : {}),
        ...(rest.length ? { last_name: rest.join(' ') } : {}),
      }),
    })
    if (!create.ok && create.status !== 422) {
      console.error('Clearstream subscriber create failed', {
        status: create.status,
        detail: (await create.text()).slice(0, 300),
      })
      return false
    }
    response = await activate()
  }

  if (!response.ok) {
    console.error('Clearstream subscriber activation failed', {
      status: response.status,
      detail: (await response.text()).slice(0, 300),
    })
    return false
  }
  return true
}

export async function sendSms(to: string, body: string, fullName?: string): Promise<SendSmsResult> {
  const apiKey = Deno.env.get('CLEARSTREAM_API_KEY')
  if (!apiKey) {
    console.error('SMS skipped: CLEARSTREAM_API_KEY is not set')
    return { sent: false, reason: 'missing_api_key' }
  }

  const phone = normalizePhone(to)
  if (!phone) {
    console.error('SMS skipped: phone could not be normalized')
    return { sent: false, reason: 'invalid_phone' }
  }

  const ready = await ensureSubscriber(apiKey, phone, fullName)
  if (!ready) return { sent: false, reason: 'subscriber_unavailable' }

  const response = await fetch(`${CLEARSTREAM_BASE}/messages`, {
    method: 'POST',
    headers: headers(apiKey),
    body: JSON.stringify({
      subscribers: [phone],
      header: 'House of Prayer DMV',
      message_body: body.slice(0, 300),
    }),
  })

  if (!response.ok) {
    const detail = await response.text()
    console.error('Clearstream send failed', { status: response.status, detail: detail.slice(0, 300) })
    return { sent: false, reason: `http_${response.status}` }
  }

  return { sent: true }
}
