import { Resend } from 'resend'

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY is not set')
  return new Resend(key)
}

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME  || "QRaze"
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL  || 'https://qraze.fr'

// Doit être une adresse sur un domaine vérifié dans Resend.
// En test, utilisez : onboarding@resend.dev
// En production, vérifiez votre domaine sur resend.com/domains puis définissez RESEND_FROM_EMAIL.
const FROM = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

export async function sendVerificationEmail(email: string, token: string) {
  const resend = getResend()
  const link   = `${SITE_URL}/api/auth/verify-email?token=${token}`
  return resend.emails.send({
    from:    `${APP_NAME} <${FROM}>`,
    to:      email,
    subject: `Confirmez votre adresse email — ${APP_NAME}`,
    html: `
      <div style="font-family:'DM Sans',sans-serif;max-width:520px;margin:auto;padding:40px;background:#faf6ee;border:1.5px solid #0d1b3e;">
        <h1 style="font-size:20px;font-weight:400;color:#0d1b3e;margin-bottom:8px;">${APP_NAME}</h1>
        <p style="color:#0d1b3e;font-size:14px;margin-bottom:24px;">Confirmez votre adresse email pour activer votre compte.</p>
        <a href="${link}" style="background:#0d1b3e;color:#faf6ee;padding:12px 24px;text-decoration:none;font-size:12px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;display:inline-block;">
          Confirmer mon email
        </a>
        <p style="color:#0d1b3e;font-size:11px;margin-top:24px;opacity:0.5;">
          Si vous n'avez pas créé de compte, ignorez cet email.
        </p>
      </div>
    `,
  })
}

export async function sendQRExpiredNotification(email: string, qrName: string) {
  const resend = getResend()
  return resend.emails.send({
    from:    `${APP_NAME} <${FROM}>`,
    to:      email,
    subject: `Votre QR code "${qrName}" a expiré — ${APP_NAME}`,
    html: `
      <div style="font-family:'DM Sans',sans-serif;max-width:520px;margin:auto;padding:40px;background:#faf6ee;border:1.5px solid #0d1b3e;">
        <h1 style="font-size:20px;font-weight:400;color:#0d1b3e;">${APP_NAME}</h1>
        <p style="color:#0d1b3e;font-size:14px;">Votre QR code <strong>"${qrName}"</strong> a atteint sa date d'expiration et n'est plus actif.</p>
        <a href="${SITE_URL}/dashboard" style="background:#0d1b3e;color:#faf6ee;padding:12px 24px;text-decoration:none;font-size:12px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;display:inline-block;margin-top:16px;">
          Gérer mes QR codes
        </a>
      </div>
    `,
  })
}
