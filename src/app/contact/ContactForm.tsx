'use client'

import { useState } from 'react'

interface ContactStrings {
  name: string; email: string; message: string
  ph_name: string; ph_email: string; ph_message: string
  submit: string; success: string; error: string
}

export function ContactForm({ strings }: { strings: ContactStrings }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    const form = e.currentTarget
    const data = {
      name:    (form.elements.namedItem('name')    as HTMLInputElement).value,
      email:   (form.elements.namedItem('email')   as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="border-2 border-navy p-10 text-center">
        <p className="font-black uppercase text-navy" style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.25rem' }}>✓</p>
        <p className="text-sm text-navy/60 mt-3 leading-relaxed">{strings.success}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold tracking-widest uppercase text-navy/50">{strings.name}</label>
          <input
            name="name"
            required
            placeholder={strings.ph_name}
            className="border-2 border-navy/20 focus:border-navy outline-none px-4 py-3 text-sm text-navy placeholder:text-navy/25 bg-white transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold tracking-widest uppercase text-navy/50">{strings.email}</label>
          <input
            name="email"
            type="email"
            required
            placeholder={strings.ph_email}
            className="border-2 border-navy/20 focus:border-navy outline-none px-4 py-3 text-sm text-navy placeholder:text-navy/25 bg-white transition-colors"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold tracking-widest uppercase text-navy/50">{strings.message}</label>
        <textarea
          name="message"
          required
          rows={6}
          placeholder={strings.ph_message}
          className="border-2 border-navy/20 focus:border-navy outline-none px-4 py-3 text-sm text-navy placeholder:text-navy/25 bg-white resize-none transition-colors"
        />
      </div>
      {status === 'error' && (
        <p className="text-xs text-red-600 font-medium">{strings.error}</p>
      )}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary self-start px-8 py-3 text-xs disabled:opacity-50"
      >
        {status === 'loading' ? '…' : strings.submit}
      </button>
    </form>
  )
}
