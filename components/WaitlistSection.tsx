'use client'

import { useState, type FormEvent } from 'react'
import { Reveal } from './Reveal'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function WaitlistSection() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const organization = String(data.get('organization') || '').trim()
    const role = String(data.get('role') || '').trim()
    const message = String(data.get('message') || '').trim()
    const honeypot = String(data.get('company_size_bot') || '').trim()
    if (honeypot.length > 0) { setStatus('success'); return }
    if (!email || !EMAIL_RX.test(email)) { setError('Please enter a valid email address.'); return }
    setStatus('submitting')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, organization, role, message }),
      })
      const body = await res.json().catch(() => ({} as { ok?: boolean; error?: string }))
      if (!res.ok || body?.ok !== true) {
        setError(typeof body?.error === 'string' ? body.error : 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }
      setStatus('success')
      form.reset()
    } catch {
      setError('Network error. Please try again.')
      setStatus('error')
    }
  }

  return (
    <section id="access" className="access">
      <div className="access-intro">
        <Reveal>
          <span className="section-eyebrow">REQUEST ACCESS</span>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="section-h2">Private beta is open.</h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="access-lede">
            Frontcourt is being deployed first with Mogul Clubs in Oshawa. We&rsquo;re talking with a small number of operators about what comes next. Tell us about your facility &mdash; we&rsquo;ll respond personally within a week or two. Not a drip campaign.
          </p>
        </Reveal>
      </div>

      <Reveal delay={240} className="access-form-wrap">
        {status === 'success' ? (
          <div className="form-success" role="status" aria-live="polite">
            <strong>You&rsquo;re on the list.</strong> Expect a personal note from Clive within a week or two.
          </div>
        ) : (
          <form className="waitlist" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <div className="row-two">
                <div>
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" type="text" required autoComplete="name" className="input" placeholder="Your name" maxLength={200} />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" required autoComplete="email" className="input" placeholder="you@example.com" maxLength={254} />
                </div>
              </div>
              <div className="row-two">
                <div>
                  <label htmlFor="organization">Organization / Facility</label>
                  <input id="organization" name="organization" type="text" autoComplete="organization" className="input" placeholder="(Optional)" maxLength={200} />
                </div>
                <div>
                  <label htmlFor="role">Role</label>
                  <select id="role" name="role" className="select" defaultValue="">
                    <option value="" disabled>Select a role</option>
                    <option value="owner">Facility Owner</option>
                    <option value="operator">Operator / GM</option>
                    <option value="manager">Manager</option>
                    <option value="franchise">Franchise / Multi-Site</option>
                    <option value="investor">Investor</option>
                    <option value="partner">Strategic Partner</option>
                    <option value="press">Press / Analyst</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="message">What are you trying to solve?</label>
                <textarea id="message" name="message" className="textarea" placeholder="Tell us about your facility, what made you reach out, or what you are trying to solve." maxLength={2000} />
              </div>
              <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
                <label htmlFor="company_size_bot">Company size (do not fill)</label>
                <input id="company_size_bot" name="company_size_bot" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              {error && <div className="form-error" role="alert" aria-live="assertive">{error}</div>}
              <button type="submit" className="button" disabled={status === 'submitting'}>
                <span>{status === 'submitting' ? 'Adding you…' : 'Request access'}</span>
                {status !== 'submitting' && <span className="button-arrow" aria-hidden="true">→</span>}
              </button>
              <p className="form-note">By submitting, you agree to be contacted by the Frontcourt team about private beta access. We don&rsquo;t sell or share your information.</p>
            </div>
          </form>
        )}
      </Reveal>
    </section>
  )
}
