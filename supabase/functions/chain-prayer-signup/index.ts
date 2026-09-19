import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { z } from 'npm:zod@3.23.8'
import { sendTemplateEmail } from '../_shared/transactional-email-templates/send-email.ts'
import { normalizePhone, sendSms } from '../_shared/send-sms.ts'

const BodySchema = z.object({
  fullName: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.union([z.string().trim().min(5).max(30), z.literal('')]),
  hour: z.number().int().min(0).max(23),
})

const attempts = new Map<string, number[]>()

function isRateLimited(key: string) {
  const now = Date.now()
  const recent = (attempts.get(key) ?? []).filter((time) => now - time < 10 * 60 * 1000)
  if (recent.length >= 5) return true
  recent.push(now)
  attempts.set(key, recent)
  return false
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

function hourLabel(hour: number) {
  const format = (h: number) => {
    const suffix = h < 12 ? 'AM' : 'PM'
    const display = h % 12 === 0 ? 12 : h % 12
    return `${display}:00 ${suffix}`
  }
  return `${format(hour)} – ${format((hour + 1) % 24)}`
}

function serviceClient() {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !serviceRoleKey) return null
  return createClient(supabaseUrl, serviceRoleKey)
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const supabase = serviceClient()
  if (!supabase) return json({ error: 'Service configuration is incomplete.' }, 500)

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('chain_prayer_slots')
      .select('hour, full_name, created_at')
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Chain prayer summary failed', { code: error.code })
      return json({ error: 'Could not load the prayer chain.' }, 500)
    }

    const summary: Record<number, { hour: number; count: number; firstNames: string[] }> = {}
    for (const row of data ?? []) {
      const entry = summary[row.hour] ?? { hour: row.hour, count: 0, firstNames: [] }
      entry.count += 1
      const firstName = String(row.full_name).trim().split(' ')[0]
      if (entry.firstNames.length < 6) entry.firstNames.push(firstName)
      summary[row.hour] = entry
    }

    return json({ slots: Object.values(summary) })
  }

  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  const clientKey = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (isRateLimited(clientKey)) {
    return json({ error: 'Please wait a few minutes before signing up again.' }, 429)
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Invalid request.' }, 400)
  }

  const parsed = BodySchema.safeParse(body)
  if (!parsed.success) return json({ error: parsed.error.flatten().fieldErrors }, 400)

  const data = parsed.data
  const { data: saved, error: saveError } = await supabase
    .from('chain_prayer_slots')
    .insert({
      hour: data.hour,
      full_name: data.fullName,
      email: data.email,
      phone: data.phone || null,
    })
    .select('id, created_at')
    .single()

  if (saveError) {
    if (saveError.code === '23505') {
      return json({ error: 'You already signed up for this hour.' }, 409)
    }
    if (saveError.code === '23514') {
      return json({ error: 'Invalid sign-up details.' }, 400)
    }
    console.error('Chain prayer sign-up save failed', { code: saveError.code })
    return json({ error: 'Your sign-up could not be saved. Please try again.' }, 500)
  }

  const slotLabel = hourLabel(data.hour)
  const templateData = {
    fullName: data.fullName,
    slotLabel,
    email: data.email,
    phone: data.phone || 'Not provided',
    submittedAt: new Date(saved.created_at).toLocaleString('en-US', { timeZone: 'America/New_York' }),
  }

  try {
    await sendTemplateEmail('chain-prayer-slot', data.email, {
      templateData,
      idempotencyKey: `chain-prayer-slot-${saved.id}`,
    })
    await sendTemplateEmail('chain-prayer-signup-alert', 'houseofprayerdmv@gmail.com', {
      templateData,
      idempotencyKey: `chain-prayer-alert-${saved.id}`,
      replyTo: data.email,
    })
  } catch (error) {
    console.error('Chain prayer email failed', {
      message: error instanceof Error ? error.message : 'Unknown error',
    })
    return json(
      { saved: true, slotLabel, warning: 'Your hour is reserved, but the confirmation email is delayed.' },
      202,
    )
  }

  return json({ saved: true, slotLabel })
})
