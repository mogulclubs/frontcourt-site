import { Reveal } from '@/components/Reveal'
import { PlatformGrid } from '@/components/PlatformGrid'
import { WaitlistSection } from '@/components/WaitlistSection'

export default function HomePage() {
  return (
    <main className="page">
      <div className="container">

        <header className="topbar">
          <a className="brand hero-anim hero-anim-1" href="/" aria-label="Frontcourt.ai — Intelligence for sports facilities">
            <svg className="brand-mark" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <g transform="matrix(0.0306,0,0,-0.0306,2.74,66.32)" fill="currentColor">
                <path d="M1275 2029 c-143 -28 -329 -107 -467 -199 -145 -97 -320 -279 -419 -435 -139 -218 -198 -428 -186 -660 6 -121 35 -228 85 -314 60 -103 209 -220 249 -195 39 25 85 212 103 419 17 201 57 346 147 535 120 250 356 545 598 746 58 48 104 92 102 98 -5 14 -146 17 -212 5z" />
                <path d="M1538 1913 c-117 -100 -250 -269 -356 -453 -111 -194 -167 -356 -197 -575 -31 -224 -53 -291 -173 -517 -39 -75 -72 -144 -72 -153 0 -39 166 8 310 87 121 67 263 191 353 310 89 118 202 345 245 493 66 227 82 483 42 665 -21 98 -58 183 -81 188 -8 1 -40 -19 -71 -45z" />
              </g>
            </svg>
            <span className="brand-divider" aria-hidden="true" />
            <span className="brand-text">
              <span className="brand-wordmark">Frontcourt<span className="brand-tld">.ai</span></span>
              <span className="brand-tagline">Intelligence for sports facilities</span>
            </span>
          </a>
          <a className="nav-cta hero-anim hero-anim-2" href="#access">
            <span>Request access</span>
            <span aria-hidden="true">→</span>
          </a>
        </header>

        <section className="hero">
          <span className="status-pill hero-anim hero-anim-3">
            <span className="pulse" aria-hidden="true" />
            In Private Beta
          </span>

          <h1 className="h1 hero-anim hero-anim-4">
            The intelligence layer for <em>sports facilities</em>.
          </h1>

          <p className="lede hero-anim hero-anim-5">
            Frontcourt is the operating software powering modern clubs, courts, and academies — from member identity and booking trust to league rankings, training analytics, and facility-wide signals. Built on a live multi-court hospitality brand. Currently deployed in production with the first operator.
          </p>

          <a className="hero-cta hero-anim hero-anim-6" href="#access">
            <span>Request access</span>
            <span className="arrow" aria-hidden="true">→</span>
          </a>
        </section>

        <section className="positioning">
          <div className="positioning-grid">
            <Reveal className="positioning-item">
              <span className="pos-num">01</span>
              <h3>What it is</h3>
              <p>A vertical SaaS platform for sports facility operators. Bookings, memberships, identity, payments, leagues, training, and an intelligence layer that makes operations decisions for you — not just reports.</p>
            </Reveal>
            <Reveal delay={80} className="positioning-item">
              <span className="pos-num">02</span>
              <h3>Who it&rsquo;s for</h3>
              <p>Multi-court racquet sports facilities, premium clubs, and emerging franchise operators who&rsquo;ve outgrown generic booking software but aren&rsquo;t ready to build their own stack.</p>
            </Reveal>
            <Reveal delay={160} className="positioning-item">
              <span className="pos-num">03</span>
              <h3>What&rsquo;s shipping</h3>
              <p>Member access &amp; check-in, dynamic membership pricing, league ladders with Glicko-2 rankings, training subscriptions, corporate &amp; event bookings, and an admin command center with anomaly detection.</p>
            </Reveal>
          </div>
        </section>

        <PlatformGrid />

        <section className="founder">
          <Reveal>
            <div className="founder-eyebrow">FOUNDER&rsquo;S NOTE</div>
          </Reveal>
          <Reveal delay={80} className="founder-card">
            <div className="founder-photo"><span className="initials">CM</span></div>
            <div>
              <h2 className="founder-name">Clive Mogul</h2>
              <p className="founder-role">Operator-Founder · Oshawa, Ontario</p>
              <p className="founder-bio">Building Frontcourt the only honest way: as the operating system behind a real facility I&rsquo;m running. Mogul Clubs opens in Oshawa with seventeen courts, three brand tiers, and a five-thousand-member Durham Region legacy migrating in. Every Frontcourt feature is forged in that live operation first, then offered to other operators who&rsquo;ve hit the same wall.</p>
            </div>
          </Reveal>
        </section>

        <WaitlistSection />

        <footer className="footer">
          <div className="footer-row">
            <div>© 2026 Frontcourt</div>
            <div>Operated from Oshawa, Ontario</div>
            <a href="mailto:hello@mogulclubs.com">hello@mogulclubs.com</a>
          </div>
        </footer>

      </div>
    </main>
  )
}
