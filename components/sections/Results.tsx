'use client'

import { useEffect, useRef } from 'react'
import GlassPanel from '@/components/ui/GlassPanel'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const RADIUS = 54
const CIRC = 2 * Math.PI * RADIUS

const stats = [
  {
    display: '40+',
    label: 'Buying signals tracked',
    fill: 0.85,
    color: '#3B82F6',
    glow: 'rgba(59,130,246,0.4)',
  },
  {
    display: '3x',
    label: 'Average pipeline increase',
    fill: 1.0,
    color: '#06B6D4',
    glow: 'rgba(6,182,212,0.4)',
  },
  {
    display: '20-30d',
    label: 'Days to first results',
    fill: 0.72,
    color: '#5B9FF5',
    glow: 'rgba(91,159,245,0.35)',
  },
]

const testimonials = [
  {
    quote:
      '"5.35% reply rate, 62.5% positive replies, and 10 pipeline opportunities from a single Clay campaign. The signal-based targeting is unlike anything we ran before."',
    name: 'LKCV Consulting',
    company: '$10K pipeline · Clay outreach system',
    initials: 'LK',
  },
  {
    quote:
      '"$20,000 in revenue driven in 1.5 months. They built our entire outbound system from scratch — infrastructure, sequences, copy, everything."',
    name: 'DTC Retail',
    company: 'dtcretail.com · Full outbound build',
    initials: 'DT',
  },
]

function RingCounter({
  display,
  label,
  fill,
  color,
  glow,
}: {
  display: string
  label: string
  fill: number
  color: string
  glow: string
}) {
  const circleRef = useRef<SVGCircleElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const triggered = useRef(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    gsap.registerPlugin(ScrollTrigger)
    if (!circleRef.current || !textRef.current) return

    circleRef.current.style.strokeDashoffset = String(CIRC)

    ScrollTrigger.create({
      trigger: textRef.current,
      start: 'top 82%',
      onEnter: () => {
        if (triggered.current) return
        triggered.current = true

        if (prefersReducedMotion) {
          if (circleRef.current)
            circleRef.current.style.strokeDashoffset = String(CIRC * (1 - fill))
          if (textRef.current) textRef.current.textContent = display
          return
        }

        gsap.to(circleRef.current!, {
          strokeDashoffset: CIRC * (1 - fill),
          duration: 1.8,
          ease: 'power3.out',
          delay: 0.1,
        })

        const isStatic = display.startsWith('<') || display.includes('-')
        if (!isStatic) {
          const numericPart = parseInt(display.replace(/\D/g, ''))
          const suffix = display.replace(/[0-9]/g, '').trim()
          const obj = { val: 0 }
          gsap.to(obj, {
            val: numericPart,
            duration: 1.8,
            ease: 'power2.out',
            delay: 0.1,
            onUpdate: () => {
              if (textRef.current)
                textRef.current.textContent = String(Math.round(obj.val)) + suffix
            },
            onComplete: () => {
              if (textRef.current) textRef.current.textContent = display
            },
          })
        } else {
          if (textRef.current) textRef.current.textContent = display
          gsap.set(textRef.current, { opacity: 0 })
          gsap.to(textRef.current, { opacity: 1, duration: 0.8, delay: 0.5 })
        }
      },
    })
  }, [display, fill])

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Ring */}
      <div className="relative w-36 h-36 flex items-center justify-center">
        <svg
          width="144"
          height="144"
          viewBox="0 0 144 144"
          className="absolute inset-0 -rotate-90"
        >
          {/* Track */}
          <circle
            cx="72"
            cy="72"
            r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="6"
          />
          {/* Fill */}
          <circle
            ref={circleRef}
            cx="72"
            cy="72"
            r={RADIUS}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={CIRC}
            style={{
              filter: 'drop-shadow(0 0 8px ' + glow + ')',
              transition: 'none',
            }}
          />
        </svg>

        {/* Value */}
        <div
          ref={textRef}
          className="relative font-black tabular-nums"
          style={{ color, fontSize: display.includes('-') ? '1.25rem' : '1.875rem' }}
        >
          0
        </div>
      </div>

      <p className="text-center text-sm font-medium" style={{ color: '#94A3B8' }}>
        {label}
      </p>
    </div>
  )
}

export default function Results() {
  const headingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.registerPlugin(ScrollTrigger)
    if (!headingRef.current) return
    gsap.set(headingRef.current, { opacity: 0, y: 30 })
    ScrollTrigger.create({
      trigger: headingRef.current,
      start: 'top 85%',
      onEnter: () =>
        gsap.to(headingRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }),
    })
  }, [])

  return (
    <section id="results" className="py-28 px-6" style={{ background: '#0A0A0A', backgroundImage: 'radial-gradient(circle at 90% 10%, rgba(59,130,246,0.26) 0%, transparent 40%), radial-gradient(circle at 5% 90%, rgba(6,182,212,0.20) 0%, transparent 38%), radial-gradient(circle at 48% 50%, rgba(139,92,246,0.12) 0%, transparent 36%)' }}>
      <div className="max-w-7xl mx-auto">
        <div data-reveal ref={headingRef} className="text-center mb-20" style={{ opacity: 0 }}>
          <span className="section-label">By the Numbers</span>
          <h2
            className="text-4xl md:text-[48px] font-semibold leading-tight"
            style={{ color: '#F8FAFC' }}
          >
            Real Systems.{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #3B82F6, #06B6D4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Real Pipeline.
            </span>
          </h2>
        </div>

        {/* Rings */}
        <div className="mb-20">
          <GlassPanel cornerRadius={24} blurAmount={16} className="w-full" style={{ width: '100%' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-12 px-8">
              {stats.map((s) => (
                <RingCounter key={s.label} {...s} />
              ))}
            </div>
          </GlassPanel>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <GlassPanel key={t.name} cornerRadius={20} blurAmount={14} className="w-full" style={{ width: '100%' }}>
              <div className="p-8 flex flex-col gap-6">
                <p className="text-[#F8FAFC] text-base leading-[1.85] italic flex-1">{t.quote}</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      background: 'rgba(59,130,246,0.15)',
                      color: '#3B82F6',
                      border: '1px solid rgba(59,130,246,0.3)',
                    }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-[#94A3B8] text-xs">{t.company}</p>
                  </div>
                </div>
              </div>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  )
}
