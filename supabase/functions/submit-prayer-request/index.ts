import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { z } from 'npm:zod@3.23.8'
import { sendTemplateEmail } from '../_shared/transactional-email-templates/send-email.ts'

const BodySchema = z.object({
  fullName: z.string().trim().min(1).max(100),
  email: z.union([z.string().trim().email().max(255), z.literal('')]),
  phone: z.union([z.string().trim().min(7).max(30), z.literal('')]),
  request: z.string().trim().min(1).max(2000),
  isPrivate: z.boolean(),
}).refine((data) => Boolean(data.email || data.phone), {
  message: 'Please provide an email address or phone number.',
  path: ['email'],
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

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  const clientKey = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (isRateLimited(clientKey)) {
    return json({ error: 'Please wait a few minutes before sending another request.' }, 429)
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Invalid request.' }, 400)
  }

  const parsed = BodySchema.safeParse(body)
  if (!parsed.success) {
    return json({ error: parsed.error.flatten().fieldErrors }, 400)
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !serviceRoleKey) return json({ error: 'Service configuration is incomplete.' }, 500)

  const data = parsed.data
  const supabase = createClient(supabaseUrl, serviceRoleKey)
  const { data: saved, error: saveError } = await supabase
    .from('prayer_requests')
    .insert({
      full_name: data.fullName,
      email: data.email || null,
      phone: data.phone || null,
      request: data.request,
      is_private: data.isPrivate,
      follow_up_requested: true,
    })
    .select('id, created_at')
    .single()

  if (saveError || !saved) {
    console.error('Prayer request save failed', { code: saveError?.code })
    return json({ error: 'Your request could not be saved. Please try again.' }, 500)
  }

  const templateData = {
    fullName: data.fullName,
    email: data.email || 'Not provided',
    phone: data.phone || 'Not provided',
    request: data.request,
    isPrivate: data.isPrivate,
    followUpRequested: true,
    submittedAt: new Date(saved.created_at).toLocaleString('en-US', { timeZone: 'America/New_York' }),
  }

  try {
    await sendTemplateEmail('prayer-request', 'houseofprayerdmv@gmail.com', {
      templateData,
      idempotencyKey: `prayer-request-${saved.id}`,
      replyTo: data.email || undefined,
    })
    await sendTemplateEmail('prayer-follow-up', 'houseofprayerdmv@gmail.com', {
      templateData,
      idempotencyKey: `prayer-follow-up-${saved.id}`,
      replyTo: data.email || undefined,
    })
  } catch (error) {
    console.error('Prayer request email failed', { message: error instanceof Error ? error.message : 'Unknown error' })
    return json({ saved: true, warning: 'Your prayer request was saved, but the email alert is delayed.' }, 202)
  }

  return json({ saved: true })
})