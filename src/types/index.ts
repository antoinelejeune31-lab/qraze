export interface QRCode {
  id: string
  user_id: string
  name: string
  url: string
  type: 'url' | 'wifi' | 'vcard' | 'sms'
  options: QROptions
  expires_at: string | null
  is_active: boolean
  scan_count: number
  created_at: string
  updated_at: string
}

export interface QROptions {
  fgColor: string
  bgColor: string
  moduleShape: string
  eyeShape: string
  logoMode: string
  useGradient: boolean
  gradStart: string
  gradEnd: string
  gradDir: string
  frame: string
  exportFmt: string
}

export interface User {
  id: string
  email: string
  name: string
  consent_terms: boolean
  consent_marketing: boolean
  created_at: string
}

export interface ApiResponse<T = any> {
  data?: T
  error?: string
}
