import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

// Cron job — à appeler quotidiennement via Vercel Cron
// vercel.json: { "crons": [{ "path": "/api/cron/expire-qr", "schedule": "0 2 * * *" }] }
export async function GET(req: NextRequest) {
  const secret = req.headers.get('x-cron-secret')
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServerClient()
  const now = new Date().toISOString()

  // Désactiver les QR codes expirés
  const { data, error } = await supabase
    .from('qr_codes')
    .update({ is_active: false })
    .eq('is_active', true)
    .lt('expires_at', now)
    .not('expires_at', 'is', null)
    .select('id, name, user_id')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ expired: data?.length || 0, timestamp: now })
}
