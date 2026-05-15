import { NextRequest, NextResponse } from 'next/server'
import { sql, initDb } from '@/lib/db'
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

  await initDb()

  const [
    totalDl, todayDl, weekDl, uniqueEmails, paidDl,
    byDay, byHour,
    totalPv, todayPv, weekPv, byPage, pvByDay,
  ] = await Promise.all([
    sql`SELECT COUNT(*)::int AS n FROM download_requests`,
    sql`SELECT COUNT(*)::int AS n FROM download_requests WHERE created_at >= CURRENT_DATE`,
    sql`SELECT COUNT(*)::int AS n FROM download_requests WHERE created_at >= NOW() - INTERVAL '7 days'`,
    sql`SELECT COUNT(DISTINCT email)::int AS n FROM download_requests`,
    sql`SELECT COUNT(*)::int AS n FROM download_requests WHERE download_type = 'paid'`,

    sql`
      SELECT DATE(created_at AT TIME ZONE 'UTC') AS day,
             SUM(CASE WHEN download_type = 'free' THEN 1 ELSE 0 END)::int AS free,
             SUM(CASE WHEN download_type = 'paid' THEN 1 ELSE 0 END)::int AS paid
      FROM download_requests
      WHERE created_at >= NOW() - INTERVAL '14 days'
      GROUP BY day ORDER BY day
    `,
    sql`
      SELECT EXTRACT(hour FROM created_at AT TIME ZONE 'UTC')::int AS hour,
             COUNT(*)::int AS count
      FROM download_requests
      GROUP BY hour ORDER BY hour
    `,

    sql`SELECT COUNT(*)::int AS n FROM page_views`,
    sql`SELECT COUNT(*)::int AS n FROM page_views WHERE created_at >= CURRENT_DATE`,
    sql`SELECT COUNT(*)::int AS n FROM page_views WHERE created_at >= NOW() - INTERVAL '7 days'`,
    sql`
      SELECT path, COUNT(*)::int AS count
      FROM page_views
      GROUP BY path ORDER BY count DESC LIMIT 8
    `,
    sql`
      SELECT DATE(created_at AT TIME ZONE 'UTC') AS day, COUNT(*)::int AS count
      FROM page_views
      WHERE created_at >= NOW() - INTERVAL '14 days'
      GROUP BY day ORDER BY day
    `,
  ])

  const total   = totalDl.rows[0].n
  const paid    = paidDl.rows[0].n
  const convRate = total > 0 ? Math.round((paid / total) * 100) : 0

  return NextResponse.json({
    downloads: {
      total,
      today:        todayDl.rows[0].n,
      week:         weekDl.rows[0].n,
      uniqueEmails: uniqueEmails.rows[0].n,
      conversionRate: convRate,
      byDay:  byDay.rows,
      byHour: byHour.rows,
    },
    pageViews: {
      total:  totalPv.rows[0].n,
      today:  todayPv.rows[0].n,
      week:   weekPv.rows[0].n,
      byPage: byPage.rows,
      byDay:  pvByDay.rows,
    },
  })
}
