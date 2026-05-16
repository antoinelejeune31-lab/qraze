import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const APP_NAME  = process.env.NEXT_PUBLIC_APP_NAME || "BARNA'B QR"
const FROM_ADDR = process.env.CONTACT_FROM_EMAIL   || 'noreply@barnabqr.fr'
const TO_ADDR   = process.env.CONTACT_EMAIL        || 'antoinelejeune31@gmail.com'

export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY
  if (!key) return NextResponse.json({ error: 'Email service not configured' }, { status: 503 })

  let body: { name?: string; email?: string; message?: string }
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid body' }, { status: 400 }) }

  const { name, email, message } = body
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const resend = new Resend(key)
  const { error } = await resend.emails.send({
    from:    `${APP_NAME} <${FROM_ADDR}>`,
    to:      TO_ADDR,
    reply_to: email.trim(),
    subject: `[Contact] Message de ${name.trim()}`,
    html: `
      <div style="font-family:'DM Sans',sans-serif;max-width:520px;margin:auto;padding:40px;background:#faf6ee;border:1.5px solid #0d1b3e;">
        <h1 style="font-size:16px;font-weight:700;color:#0d1b3e;margin-bottom:4px;text-transform:uppercase;letter-spacing:0.1em;">Nouveau message de contact</h1>
        <p style="color:#0d1b3e;font-size:12px;opacity:0.5;margin-bottom:24px;">${APP_NAME}</p>
        <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
          <tr><td style="padding:6px 0;font-size:12px;color:#0d1b3e;opacity:0.5;width:80px;">Nom</td><td style="padding:6px 0;font-size:14px;color:#0d1b3e;font-weight:600;">${name.trim()}</td></tr>
          <tr><td style="padding:6px 0;font-size:12px;color:#0d1b3e;opacity:0.5;">Email</td><td style="padding:6px 0;font-size:14px;color:#0d1b3e;"><a href="mailto:${email.trim()}" style="color:#0d1b3e;">${email.trim()}</a></td></tr>
        </table>
        <div style="border-top:1px solid rgba(13,27,62,0.15);padding-top:16px;">
          <p style="font-size:12px;color:#0d1b3e;opacity:0.5;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.08em;">Message</p>
          <p style="font-size:14px;color:#0d1b3e;line-height:1.6;white-space:pre-wrap;">${message.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
        </div>
      </div>
    `,
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}
