import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'

function expectedToken() {
  const pwd    = process.env.ADMIN_PASSWORD ?? ''
  const secret = process.env.CRON_SECRET    ?? 'fallback'
  return createHash('sha256').update(`${pwd}:${secret}`).digest('hex')
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Protect /admin/* but not /admin/login
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = req.cookies.get('admin-token')?.value
    if (token !== expectedToken()) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
