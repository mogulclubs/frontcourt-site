'use client'

import { useState, type FormEvent } from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function HomePage() {
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
    <main className="page">
      <div className="container">
        <header className="topbar">
          <a className="brand" href="/" aria-label="Frontcourt.ai — Intelligence for sports facilities">
            <svg className="brand-mark" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor">
              <path d="M31 8 C 18 12 12 22 12 32 C 12 42 18 52 31 56 Z" />
              <path d="M33 8 C 46 12 52 22 52 32 C 52 42 46 52 33 56 Z" />
            </svg>
            <span className="brand-divider" aria-hidden="true" />
            <span className="brand-text">
              <span className="brand-wordmark">Frontcourt<span className="brand-tld">.ai</span></span>
              <span className="brand-tagline">Intelligence for sports facilities</span>
            </span>
          </a>
          <div className="topbar-meta">Est. 2026 · Oshawa, ON</div>
        </header>

        <section className="hero">
          <span className="status-pill">
            <span className="pulse" aria-hidden="true" />
            In Private Beta
          </span>

          <h1 className="h1">
            The intelligence layer for <em>sports facilities</em>.
          </h1>

          <p className="lede">
            Frontcourt is the operating software powering modern clubs, courts, and academies — from member identity and booking trust to league rankings, training analytics, and facility-wide signals. Built on a live multi-court hospitality brand. Currently deployed in production with the first operator.
          </p>

          {status === 'success' ? (
            <div className="form-success" role="status" aria-live="polite">
              <strong>You&rsquo;re on the list.</strong> We&rsquo;ll reach out personally when your category opens. Expect a note from Clive within a week or two — not a drip campaign.
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
                  {status === 'submitting' ? 'Adding you…' : 'Request access'}
                </button>
                <p className="form-note">By submitting, you agree to be contacted by the Frontcourt team about private beta access. We don&rsquo;t sell or share your information.</p>
              </div>
            </form>
          )}
        </section>

        <section className="positioning">
          <div className="positioning-grid">
            <div className="positioning-item">
              <h3>What it is</h3>
              <p>A vertical SaaS platform for sports facility operators. Bookings, memberships, identity, payments, leagues, training, and an intelligence layer that makes operations decisions for you — not just reports.</p>
            </div>
            <div className="positioning-item">
              <h3>Who it&rsquo;s for</h3>
              <p>Multi-court racquet sports facilities, premium clubs, and emerging franchise operators who&rsquo;ve outgrown generic booking software but aren&rsquo;t ready to build their own stack.</p>
            </div>
            <div className="positioning-item">
              <h3>What&rsquo;s shipping</h3>
              <p>Member access &amp; check-in, dynamic membership pricing, league ladders with Glicko-2 rankings, training subscriptions, corporate &amp; event bookings, and an admin command center with anomaly detection.</p>
            </div>
          </div>
        </section>

        <section className="founder">
          <div className="founder-eyebrow">Founder</div>
          <div className="founder-card">
            <div className="founder-photo"><span className="initials">CM</span></div>
            <div>
              <h2 className="founder-name">Clive Mogul</h2>
              <p className="founder-role">Founder &amp; Operator</p>
              <p className="founder-bio">Building Frontcourt the only honest way: as the operating system behind a real facility I&rsquo;m running. Mogul Clubs opens in Oshawa with seventeen courts, three brand tiers, and a five-thousand-member Durham Region legacy migrating in. Every Frontcourt feature is forged in that live operation first, then offered to other operators who&rsquo;ve hit the same wall.</p>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div>© 2026 Frontcourt. Operated from Oshawa, Ontario.</div>
          <div><a href="mailto:hello@mogulclubs.com">hello@mogulclubs.com</a></div>
        </footer>
      </div>
    </main>
  )
}
