import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'You\'re Booked | Sigflow GTM',
  description: 'Your strategy call is confirmed. We\'ll see you soon.',
}

export default function ThankYou() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{
        background: '#0A0A0A',
        backgroundImage: 'radial-gradient(ellipse 60% 55% at 50% 50%, rgba(34,197,94,0.08) 0%, rgba(59,130,246,0.08) 50%, transparent 70%)',
      }}
    >
      {/* Breadcrumb */}
      <nav className="absolute top-8 left-8 text-xs" style={{ color: '#334155' }} aria-label="Breadcrumb">
        <ol style={{ display: 'flex', gap: 8, listStyle: 'none', padding: 0, margin: 0, alignItems: 'center' }}>
          <li><Link href="/" style={{ color: '#3B82F6', textDecoration: 'none' }}>Home</Link></li>
          <li style={{ color: '#1E293B' }}>›</li>
          <li>Thank You</li>
        </ol>
      </nav>

      {/* Check icon */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-8"
        style={{
          background: 'rgba(34,197,94,0.1)',
          border: '1px solid rgba(34,197,94,0.3)',
          boxShadow: '0 0 40px rgba(34,197,94,0.12)',
        }}
      >
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <path d="M8 18L15 25L28 11" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
        You're booked. 🎯
      </h1>

      <p className="text-[#94A3B8] text-base max-w-md mb-3">
        Check your email for a calendar invite. We'll dig into your GTM setup and show you exactly where the pipeline is leaking.
      </p>

      <p className="text-sm mb-10" style={{ color: '#334155' }}>
        We respond within <span style={{ color: '#22C55E' }}>24 hours</span> — usually much faster.
      </p>

      {/* What to expect */}
      <div
        className="w-full max-w-md rounded-2xl p-6 mb-10 text-left"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#3B82F6' }}>
          What to expect on the call
        </p>
        {[
          { n: '01', t: 'GTM Audit', d: 'We review your current outbound, stack, and ICP' },
          { n: '02', t: 'Signal Mapping', d: 'We identify the 3-5 highest-intent signals for your market' },
          { n: '03', t: 'Custom Roadmap', d: 'You leave with a clear plan to 3× your pipeline' },
        ].map(({ n, t, d }) => (
          <div key={n} className="flex gap-4 mb-4 last:mb-0">
            <span className="text-xs font-black tabular-nums mt-0.5 flex-shrink-0" style={{ color: '#3B82F6' }}>{n}</span>
            <div>
              <p className="text-white text-sm font-semibold">{t}</p>
              <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>{d}</p>
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/"
        className="text-sm"
        style={{ color: '#3B82F6', textDecoration: 'none' }}
      >
        ← Back to Sigflow GTM
      </Link>
    </main>
  )
}
