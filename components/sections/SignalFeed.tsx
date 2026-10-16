'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const SIGNALS = [
  { company: 'Rippling',       signal: 'Hired 4 Enterprise AEs',        type: 'Hiring',    score: 94, icon: '👥' },
  { company: 'Deel',           signal: 'Raised Series D · $425M',        type: 'Funding',   score: 98, icon: '💰' },
  { company: 'Retool',         signal: 'Migrated from Salesforce → HubSpot', type: 'Tech',  score: 87, icon: '⚙️' },
  { company: 'Lattice',        signal: 'Job posting: Head of Revenue Ops', type: 'Intent',  score: 91, icon: '📋' },
  { company: 'Clearbit',       signal: 'Visited pricing page 3×',        type: 'Web',       score: 89, icon: '🌐' },
  { company: 'Gong',           signal: 'Opened 3 outbound emails',       type: 'Email',     score: 76, icon: '📧' },
  { company: 'Loom',           signal: 'Tech stack: added Clay + Apollo', type: 'Tech',     score: 83, icon: '⚙️' },
  { company: 'Linear',         signal: 'Raised Series B · $35M',         type: 'Funding',   score: 96, icon: '💰' },
  { company: 'Notion',         signal: 'Hiring 6 outbound SDRs',         type: 'Hiring',    score: 92, icon: '👥' },
  { company: 'Webflow',        signal: 'CTO change detected',            type: 'Trigger',   score: 88, icon: '🔔' },
  { company: 'Figma',          signal: 'Job: VP of Sales posted',        type: 'Intent',    score: 90, icon: '📋' },
  { company: 'Brex',           signal: 'Website traffic spike +340%',    type: 'Web',       score: 85, icon: '🌐' },
  { company: 'Vercel',         signal: 'Raised Series C · $150M',        type: 'Funding',   score: 97, icon: '💰' },
  { company: 'Intercom',       signal: 'Replaced Outreach with Salesloft', type: 'Tech',    score: 81, icon: '⚙️' },
  { company: 'Mixpanel',       signal: 'New SDR manager LinkedIn post',  type: 'Intent',    score: 78, icon: '📋' },
  { company: 'Amplitude',      signal: 'Clicked competitor comparison page', type: 'Web',   score: 86, icon: '🌐' },
]

const TYPE_COLORS: Record<string, string> = {
  Funding: '#22C55E',
  Hiring:  '#3B82F6',
  Tech:    '#06B6D4',
  Intent:  '#F59E0B',
  Web:     '#8B5CF6',
  Email:   '#EC4899',
  Trigger: '#EF4444',
}

function RadarSweep({ active }: { active: boolean }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 220, height: 220 }}>
      {/* Grid rings */}
      {[1, 0.75, 0.5, 0.25].map((s, i) => (
        <div key={i} className="absolute rounded-full" style={{
          width: 220 * s, height: 220 * s,
          border: '1px solid rgba(59,130,246,0.15)',
        }} />
      ))}
      {/* Cross hairs */}
      <div className="absolute" style={{ width: '100%', height: 1, background: 'rgba(59,130,246,0.12)' }} />
      <div className="absolute" style={{ width: 1, height: '100%', background: 'rgba(59,130,246,0.12)' }} />

      {/* Sweep */}
      {active && (
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div style={{
            position: 'absolute', inset: 0,
            background: 'conic-gradient(from 0deg, transparent 300deg, rgba(59,130,246,0.35) 355deg, rgba(59,130,246,0.05) 360deg)',
            animation: 'radarSpin 2.8s linear infinite',
            transformOrigin: 'center',
          }} />
        </div>
      )}

      {/* Blips */}
      {active && [
        { x: 62, y: 48, delay: '0.4s' },
        { x: 130, y: 72, delay: '1.1s' },
        { x: 88, y: 148, delay: '1.8s' },
        { x: 158, y: 130, delay: '0.9s' },
        { x: 42, y: 110, delay: '2.2s' },
        { x: 170, y: 60, delay: '1.5s' },
      ].map((b, i) => (
        <div key={i} style={{
          position: 'absolute', left: b.x, top: b.y,
          width: 5, height: 5, borderRadius: '50%',
          background: '#22C55E',
          boxShadow: '0 0 8px #22C55E',
          animation: 'blipPulse 2.8s ease-in-out infinite',
          animationDelay: b.delay,
        }} />
      ))}

      <div className="text-center z-10">
        <p className="text-xs font-mono" style={{ color: '#22C55E' }}>LIVE</p>
        <p className="text-[10px] font-mono" style={{ color: 'rgba(34,197,94,0.6)' }}>SCANNING</p>
      </div>
    </div>
  )
}

function SignalCard({ sig, index }: { sig: typeof SIGNALS[0]; index: number }) {
  const color = TYPE_COLORS[sig.type] || '#3B82F6'
  return (
    <div
      className="signal-card flex items-start gap-3 rounded-xl px-3 py-2.5"
      style={{
        background: 'rgba(255,255,255,0.035)',
        border: '1px solid rgba(255,255,255,0.07)',
        opacity: 0,
        transform: 'translateX(-24px)',
      }}
    >
      <span className="text-lg flex-shrink-0 mt-0.5">{sig.icon}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="text-white font-semibold text-sm truncate">{sig.company}</span>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded" style={{ background: color + '1A', color }}>
              {sig.type}
            </span>
          </div>
        </div>
        <p className="text-xs mt-0.5 truncate min-w-0" style={{ color: '#64748B' }}>{sig.signal}</p>
      </div>
      <div className="flex-shrink-0 flex flex-col items-end gap-0.5">
        <span className="text-sm font-black tabular-nums" style={{ color }}>{sig.score}</span>
        <div className="w-12 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div className="h-full rounded-full" style={{ width: sig.score + '%', background: color, opacity: 0.8 }} />
        </div>
      </div>
    </div>
  )
}

export default function SignalFeed() {
  const sectionRef  = useRef<HTMLElement>(null)
  const feedRef     = useRef<HTMLDivElement>(null)
  const headRef     = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const [count, setCount]   = useState(0)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (!sectionRef.current) return

    // Heading fade in
    if (headRef.current) {
      gsap.set(headRef.current, { opacity: 0, y: 28 })
      ScrollTrigger.create({
        trigger: headRef.current,
        start: 'top 85%',
        onEnter: () => gsap.to(headRef.current, { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' }),
      })
    }

    // Activate radar + stagger cards on scroll
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 60%',
      onEnter: () => {
        setActive(true)

        const cards = feedRef.current?.querySelectorAll('.signal-card') ?? []
        gsap.to(cards, {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.09,
          ease: 'power2.out',
        })

        // Count up
        let n = 0
        const interval = setInterval(() => {
          n += Math.floor(Math.random() * 3) + 1
          if (n >= 247) { setCount(247); clearInterval(interval) }
          else setCount(n)
        }, 30)
      },
    })
  }, [])

  const displayed = SIGNALS.slice(0, 10)

  return (
    <section
      id="signal-feed"
      ref={sectionRef}
      className="py-28 px-6"
      style={{
        background: '#080C14',
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(59,130,246,0.12) 0%, transparent 45%), radial-gradient(circle at 80% 50%, rgba(6,182,212,0.10) 0%, transparent 45%)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div ref={headRef} className="text-center mb-16" style={{ opacity: 0 }}>
          <span className="section-label">Signal Intelligence</span>
          <h2 className="text-4xl md:text-[48px] font-semibold leading-tight" style={{ color: '#F8FAFC' }}>
            We See Who's Ready{' '}
            <span style={{ background: 'linear-gradient(135deg, #22C55E, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Before You Do.
            </span>
          </h2>
          <p className="mt-4 text-base max-w-xl mx-auto" style={{ color: '#64748B' }}>
            Real-time buying signals across 40+ data sources. Every trigger mapped to pipeline opportunity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8 items-start min-w-0">
          {/* Feed */}
          <div
            ref={feedRef}
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(59,130,246,0.15)', background: 'rgba(8,12,20,0.9)', backdropFilter: 'blur(20px)' }}
          >
            {/* Terminal bar */}
            <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#EF4444' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#F59E0B' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#22C55E' }} />
              <span className="ml-3 text-xs font-mono" style={{ color: '#334155' }}>sigflow_signal_feed — live</span>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#22C55E', animation: 'pulse 1.5s infinite' }} />
                <span className="text-[10px] font-mono" style={{ color: '#22C55E' }}>
                  {count} signals today
                </span>
              </div>
            </div>

            {/* Cards */}
            <div className="p-3 flex flex-col gap-2">
              {displayed.map((sig, i) => (
                <SignalCard key={sig.company} sig={sig} index={i} />
              ))}
            </div>
          </div>

          {/* Right panel — hidden on mobile */}
          <div className="hidden lg:flex flex-col gap-6 items-center">
            {/* Radar */}
            <div
              className="w-full rounded-2xl flex flex-col items-center py-6 px-4 gap-4"
              style={{ border: '1px solid rgba(59,130,246,0.15)', background: 'rgba(8,12,20,0.9)', backdropFilter: 'blur(20px)' }}
            >
              <p className="text-xs font-mono uppercase tracking-widest" style={{ color: '#334155' }}>Signal Radar</p>
              <RadarSweep active={active} />
            </div>

            {/* Signal type legend */}
            <div
              className="w-full rounded-2xl py-5 px-5"
              style={{ border: '1px solid rgba(59,130,246,0.15)', background: 'rgba(8,12,20,0.9)', backdropFilter: 'blur(20px)' }}
            >
              <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: '#334155' }}>Signal Types</p>
              <div className="flex flex-col gap-2.5">
                {Object.entries(TYPE_COLORS).map(([type, color]) => (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                      <span className="text-xs" style={{ color: '#94A3B8' }}>{type}</span>
                    </div>
                    <div className="w-16 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: (Math.random() * 50 + 40) + '%', background: color, opacity: 0.7 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes radarSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes blipPulse {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50%       { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </section>
  )
}
