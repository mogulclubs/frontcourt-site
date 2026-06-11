// Frontcourt.ai waitlist submission endpoint.
//
// Server-side relay to Supabase. Anon key stays in Vercel env vars and never
// touches the client bundle. RLS on public.frontcourt_waitlist enforces
// insert-only at the database boundary.

import { NextResponse, type NextRequest } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const EMAIL_RX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+[.][A-Za-z]{2,}$/

function bad(reason: string, status = 400) {
  return NextResponse.json({ ok: false, error: reason }, { status })
}

function clip(v: unknown, max: number): string | null {
  if (typeof v !== 'string') return null
  const t = v.trim()
  if (t.length === 0) return null
  return t.slice(0, max)
}

export async function POST(req: NextRequest) {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('[waitlist] Supabase env vars missing')
    return bad('Server misconfigured.', 500)
  }

  let payload: Record<string, unknown>
  try {
    payload = (await req.json()) as Record<string, unknown>
  } catch {
    return bad('Invalid JSON body.')
  }

  const email = clip(payload.email, 254)
  if (!email || !EMAIL_RX.test(email)) return bad('Invalid email.')

  const name = clip(payload.name, 200)
  const organization = clip(payload.organization, 200)
  const role = clip(payload.role, 100)
  const message = clip(payload.message, 2000)

  const userAgent = req.headers.get('user-agent') || null
  const referrer = req.headers.get('referer') || null
  const xff = req.headers.get('x-forwarded-for')
  const ip = (xff ? xff.split(',')[0].trim() : null) || req.headers.get('x-real-ip') || null

  const body = {
    email,
    name,
    organization,
    role,
    message,
    user_agent: userAgent,
    referrer,
    ip,
    source: 'frontcourt.ca',
  }

  try {
    const r = await fetch(SUPABASE_URL + '/rest/v1/frontcourt_waitlist', {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: 'Bearer ' + SUPABASE_ANON_KEY,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    })

    if (r.status === 201 || r.status === 204) {
      return NextResponse.json({ ok: true })
    }
    if (r.status === 409) {
      return NextResponse.json({ ok: true, deduped: true })
    }

    const errBody = await r.text().catch(() => '')
    console.error('[waitlist] supabase reject', r.status, errBody.slice(0, 400))
    return bad('Could not save your entry. Please try again shortly.', 502)
  } catch (e) {
    console.error('[waitlist] supabase network error', e)
    return bad('Network error talking to upstream.', 502)
  }
}
