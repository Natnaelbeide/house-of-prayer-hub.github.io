// One-off: sends the School of Ministry orientation reminder (with a Bible verse) to all registrants.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { sendSms } from '../_shared/send-sms.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const MESSAGE = `School of Ministry orientation is TONIGHT at 8:00 PM (Eastern). Come ready to study God's Word! "Study to shew thyself approved unto God, a workman that needeth not to be ashamed, rightly dividing the word of truth." - 2 Timothy 2:15`

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    const { data: registrants, error } = await supabase
      .from('ministry_registrations')
      .select('full_name, phone')

    if (error) throw error

    let textsSent = 0
    let skipped = 0
    const failures: { name?: string; phone: string | null; reason?: string }[] = []

    for (const r of registrants ?? []) {
      if (!r.phone) {
        skipped++
        continue
      }
      const result = await sendSms(r.phone, MESSAGE, r.full_name)
      if (result.sent) {
        textsSent++
      } else {
        skipped++
        failures.push({ name: r.full_name, phone: r.phone, reason: result.reason })
      }
    }

    return new Response(
      JSON.stringify({ total: registrants?.length ?? 0, textsSent, skipped, failures }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
