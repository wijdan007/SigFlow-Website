'use client'

import { useEffect, useRef } from 'react'

const clients = [
  'Technowis',
  'LKCV Consulting',
  'Partnerincommerce',
  'Dayly Group',
  'Syntax Logix',
  'Convoi AI',
]

// Duplicate for seamless loop
const marqueeItems = [...clients, ...clients, ...clients]

export default function Clients() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !trackRef.current) return

    const init = async () => {
      const { gsap } = await import('gsap')

      // Each set of 6 items = 100% of one loop; we animate by 33.333% (one set)
      gsap.to(trackRef.current, {
        xPercent: -33.333,
        duration: 22,
        ease: 'none',
        repeat: -1,
      })
    }
    init()
  }, [])

  return (
    <section
      className="py-14 overflow-hidden relative"
      style={{
        background: '#0d0d0d',
        borderTop: '1px solid rgba(59,130,246,0.08)',
        borderBottom: '1px solid rgba(59,130,246,0.08)',
      }}
    >
      {/* Fade edges */}
      <div
        className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, #0d0d0d, transparent)',
        }}
      />
      <div
        className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to left, #0d0d0d, transparent)',
        }}
      />

      {/* Label */}
      <p
        className="text-center text-xs font-semibold uppercase tracking-widest mb-8"
        style={{ color: '#94A3B8', letterSpacing: '0.2em' }}
      >
        Trusted by GTM teams at
      </p>

      {/* Marquee track */}
      <div className="flex items-center" style={{ willChange: 'transform' }}>
        <div
          ref={trackRef}
          className="flex items-center gap-0 flex-nowrap"
          style={{ width: 'max-content' }}
        >
          {marqueeItems.map((name, i) => (
            <div
              key={i}
              className="flex items-center gap-0 flex-shrink-0"
            >
              {/* Client name */}
              <span
                className="px-10 text-lg font-semibold whitespace-nowrap transition-colors duration-300 cursor-default select-none"
                style={{ color: '#4B5563' }}
                onMouseEnter={(e) => {
                  ;(e.target as HTMLSpanElement).style.color = '#F8FAFC'
                }}
                onMouseLeave={(e) => {
                  ;(e.target as HTMLSpanElement).style.color = '#4B5563'
                }}
              >
                {name}
              </span>

              {/* Dot separator */}
              <span
                className="flex-shrink-0 w-1.5 h-1.5 rounded-full"
                style={{ background: 'rgba(59,130,246,0.35)' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
