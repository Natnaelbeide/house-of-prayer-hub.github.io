// Server-only: sends text messages through Clearstream.
// Reads CLEARSTREAM_API_KEY — never expose to the browser.

const CLEARSTREAM_URL = 'https://api.getclearstream.com/v1/messages'

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

export async function sendSms(to: string, body: string): Promise<SendSmsResult> {
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

  const response = await fetch(CLEARSTREAM_URL, {
    method: 'POST',
    headers: {
      'X-Api-Key': apiKey,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
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
