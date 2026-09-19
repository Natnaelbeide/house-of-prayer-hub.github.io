import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { sendTemplateEmail } from '../_shared/transactional-email-templates/send-email.ts'
import { normalizePhone, sendSms } from '../_shared/send-sms.ts'

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

function formatHour(hour: number) {
  const suffix = hour < 12 ? 'AM' : 'PM'
  const display = hour % 12 === 0 ? 12 : hour % 12
  return `${display}:00 ${suffix}`
}

function hourLabel(hour: number) {
  return `${formatHour(hour)} – ${formatHour((hour + 1) % 24)}`
}

/** Current hour in Eastern Time, plus the ET calendar date. */
function easternNow() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/New_York',
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
  }).formatToParts(new Date())
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? '00'
  const hour = Number(get('hour')) % 24
  return { hour, date: `${get('year')}-${get('month')}-${get('day')}` }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !serviceRoleKey) return json({ error: 'Service configuration is incomplete.' }, 500)
  const supabase = createClient(supabaseUrl, serviceRoleKey)

  const { hour: currentHour, date } = easternNow()
  const targetHour = (currentHour + 1) % 24

  const { data: rows, error } = await supabase
    .from('chain_prayer_slots')
    .select('id, hour, full_name, email, phone, last_reminded_at')
    .eq('hour', targetHour)
    .eq('reminders_enabled', true)

  if (error) {
    console.error('Chain prayer reminder lookup failed', { code: error.code })
    return json({ error: 'Could not load prayer partners.' }, 500)
  }

  const slotLabel = hourLabel(targetHour)
  const cutoff = Date.now() - 20 * 60 * 60 * 1000
  let textsSent = 0
  let emailsSent = 0
  let skipped = 0

  for (const row of rows ?? []) {
    if (row.last_reminded_at && new Date(row.last_reminded_at).getTime() > cutoff) {
      skipped += 1
      continue
    }

    let delivered = false
    const phone = normalizePhone(row.phone)

    if (phone) {
      try {
        const sms = await sendSms(
          phone,
          `${String(row.full_name).split(' ')[0]}, your prayer hour (${slotLabel} ET) starts in about an hour. "Pray without ceasing." - 1 Thess 5:17`,
        )
        if (sms.sent) {
          delivered = true
          textsSent += 1
        }
      } catch (smsError) {
        console.error('Chain prayer reminder text failed', {
          message: smsError instanceof Error ? smsError.message : 'Unknown error',
        })
      }
    }

    if (!delivered) {
      try {
        const result = await sendTemplateEmail('chain-prayer-reminder', row.email, {
          templateData: { fullName: row.full_name, slotLabel },
          idempotencyKey: `chain-prayer-reminder-${row.id}-${date}`,
        })
        if (result.sent) {
          delivered = true
          emailsSent += 1
        }
      } catch (sendError) {
        console.error('Chain prayer reminder send failed', {
          message: sendError instanceof Error ? sendError.message : 'Unknown error',
        })
      }
    }

    if (delivered) {
      await supabase
        .from('chain_prayer_slots')
        .update({ last_reminded_at: new Date().toISOString() })
        .eq('id', row.id)
    } else {
      skipped += 1
    }
  }

  return json({ targetHour, slotLabel, textsSent, emailsSent, skipped })
})
