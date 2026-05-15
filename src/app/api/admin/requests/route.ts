import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { createHash } from 'crypto'

function expectedToken() {
  const pwd    = process.env.ADMIN_PASSWORD ?? ''
  const secret = process.env.CRON_SECRET    ?? 'fallback'
  return createHash('sha256').update(`${pwd}:${secret}`).digest('hex')
}

function isAuthenticated(req: NextRequest) {
  return req.cookies.get('admin-token')?.value === expectedToken()
}

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('download_requests')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(500)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}
