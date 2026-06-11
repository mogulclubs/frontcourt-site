import { Reveal } from './Reveal'

const PILLARS = [
  {
    label: 'OPERATIONS',
    title: 'How the facility runs.',
    items: ['Bookings', 'Memberships', 'Check-In', 'Events', 'Leagues'],
  },
  {
    label: 'INTELLIGENCE',
    title: 'How the facility thinks.',
    items: [
      'Member Intelligence',
      'Access Intelligence',
      'Training Intelligence',
      'Revenue Intelligence',
      'Facility Intelligence',
    ],
  },
  {
    label: 'AUTOMATION',
    title: 'How the facility acts.',
    items: ['Notifications', 'Workflows', 'Recovery Systems', 'Action Queues'],
  },
  {
    label: 'GROWTH',
    title: 'How the facility scales.',
    items: ['Retention', 'Corporate Programs', 'Multi-Location Expansion'],
  },
]

export function PlatformGrid() {
  return (
    <section className="platform">
      <div className="platform-intro">
        <Reveal>
          <span className="section-eyebrow">PLATFORM</span>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="section-h2">
            An operating system for sports facilities,{' '}
            <em>not a booking app.</em>
          </h2>
        </Reveal>
      </div>
      <div className="platform-grid">
        {PILLARS.map((pillar, i) => (
          <Reveal key={pillar.label} delay={i * 80} className="platform-pillar">
            <div className="pillar-label">{pillar.label}</div>
            <div className="pillar-title">{pillar.title}</div>
            <ul className="pillar-items">
              {pillar.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
      <Reveal className="platform-outro">
        <p>Seventeen capabilities. One operating layer. Built on a live facility.</p>
      </Reveal>
    </section>
  )
}
