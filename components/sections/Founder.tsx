'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const VISION_POINTS = [
  {
    title: 'Signal-First, Always',
    body: 'Most agencies spray and pray. We identify exactly when a company is in a buying window before we ever reach out. Timing is the only variable that matters.',
  },
  {
    title: 'Systems, Not Campaigns',
    body: 'We build infrastructure that compounds. Every signal layer, sequence, and touchpoint is engineered to get smarter week over week - not reset every quarter.',
  },
  {
    title: 'Outcomes Over Activity',
    body: 'We are measured on qualified meetings and pipeline, full stop. Not emails sent, not opens, not vanity metrics. Your revenue is the only scoreboard we care about.',
  },
]

export default function Founder() {
  const sectionRef  = useRef<HTMLElement>(null)
  const photoRef    = useRef<HTMLDivElement>(null)
  const contentRef  = useRef<HTMLDivElement>(null)
  const pointRefs   = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (photoRef.current) {
      gsap.set(photoRef.current, { opacity: 0, x: -40 })
      ScrollTrigger.create({
        trigger: photoRef.current,
        start: 'top 80%',
        onEnter: () => gsap.to(photoRef.current, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' }),
      })
    }

    if (contentRef.current) {
      gsap.set(contentRef.current, { opacity: 0, x: 40 })
      ScrollTrigger.create({
        trigger: contentRef.current,
        start: 'top 80%',
        onEnter: () => gsap.to(contentRef.current, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.12 }),
      })
    }

    pointRefs.current.forEach((el, i) => {
      if (!el) return
      gsap.set(el, { opacity: 0, y: 20 })
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', delay: i * 0.1 }),
      })
    })
  }, [])

  return (
    <section
      id="founder"
      ref={sectionRef}
      className="py-28 px-6 relative overflow-hidden"
      style={{
        background: '#080C14',
        backgroundImage: 'radial-gradient(circle at 15% 50%, rgba(59,130,246,0.13) 0%, transparent 45%), radial-gradient(circle at 85% 30%, rgba(6,182,212,0.08) 0%, transparent 40%)',
      }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(59,130,246,0.3), transparent)' }} />

      <div className="max-w-7xl mx-auto">

        {/* Section label */}
        <div className="text-center mb-16">
          <span className="section-label">The Person Behind It</span>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">

          {/* Photo */}
          <div data-reveal ref={photoRef} className="flex flex-col items-center lg:items-start" style={{ opacity: 0 }}>
            <div className="relative">
              {/* Glow behind photo */}
              <div className="absolute -inset-4 rounded-3xl" style={{ background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.18) 0%, transparent 70%)', filter: 'blur(20px)' }} />

              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  width: 'min(320px, calc(100vw - 80px))', height: 380,
                  border: '1px solid rgba(59,130,246,0.2)',
                  boxShadow: '0 0 60px rgba(59,130,246,0.12), 0 24px 48px rgba(0,0,0,0.6)',
                }}
              >
                <Image
                  src="/founder.jpg"
                  alt="Wijdan - Founder and CEO of Sigflow GTM"
                  fill
                  sizes="(max-width: 640px) calc(100vw - 80px), 320px"
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                />
                {/* Subtle gradient overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-24" style={{ background: 'linear-gradient(to top, rgba(8,12,20,0.7), transparent)' }} />
              </div>

              {/* Name card overlapping bottom */}
              <div
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap px-5 py-3 rounded-xl text-center"
                style={{
                  background: 'rgba(8,12,20,0.95)',
                  border: '1px solid rgba(59,130,246,0.25)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                }}
              >
                <p className="text-white font-bold text-base leading-none mb-1">Wijdan</p>
                <p className="text-xs" style={{ color: '#3B82F6' }}>Founder & CEO, Sigflow GTM</p>
              </div>
            </div>

            {/* Prospeo partner badge */}
            <div
              className="flex items-center gap-3 mt-12 px-5 py-3 rounded-xl"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-black text-sm"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #4F46E5)', color: 'white' }}
              >
                P
              </div>
              <div>
                <p className="text-white text-sm font-semibold leading-none mb-0.5">Official Prospeo Partner</p>
                <p className="text-xs" style={{ color: '#475569' }}>Certified lead intelligence & enrichment</p>
              </div>
              <div className="ml-2 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)' }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2 2 4-4" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Quote + content */}
          <div data-reveal ref={contentRef} style={{ opacity: 0 }}>
            {/* Big quote mark */}
            <div className="text-8xl font-black leading-none mb-2 select-none" style={{ color: 'rgba(59,130,246,0.15)', fontFamily: 'Georgia, serif', lineHeight: 0.8 }}>
              &ldquo;
            </div>

            <blockquote
              className="text-2xl md:text-3xl font-semibold leading-snug mb-8"
              style={{ color: '#F8FAFC' }}
            >
              Most companies do not have a pipeline problem.
              They have a{' '}
              <span style={{ background: 'linear-gradient(135deg, #3B82F6, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                signal problem.
              </span>
            </blockquote>

            <p className="text-base leading-relaxed mb-8" style={{ color: '#64748B' }}>
              I built Sigflow GTM after watching great products die because their GTM motion was broken.
              The solution was never more emails - it was smarter targeting, better timing, and systems
              that compound. Every client engagement starts with one question: who is ready to buy
              right now, and why?
            </p>

            {/* Stats inline */}
            <div className="flex flex-wrap gap-6 mb-8">
              {[
                { v: '40+', l: 'signals tracked per prospect' },
                { v: '3x',  l: 'avg pipeline increase' },
                { v: '20-30d', l: 'days to first results' },
              ].map(({ v, l }) => (
                <div key={l}>
                  <p className="text-xl font-black" style={{ color: '#3B82F6' }}>{v}</p>
                  <p className="text-xs" style={{ color: '#64748B' }}>{l}</p>
                </div>
              ))}
            </div>

            <a
              href="https://calendly.com/book-strategycall-sigflow-wijdan"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow inline-block text-sm px-7 py-3"
              style={{ textDecoration: 'none' }}
            >
              Talk to Wijdan Directly
            </a>
          </div>
        </div>

        {/* Vision points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {VISION_POINTS.map((pt, i) => (
            <div data-reveal
              key={pt.title}
              ref={(el) => { pointRefs.current[i] = el }}
              className="rounded-xl p-6"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
                opacity: 0,
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-1.5 h-5 rounded-full" style={{ background: 'linear-gradient(to bottom, #3B82F6, #06B6D4)' }} />
                <h3 className="text-white font-semibold text-base">{pt.title}</h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>{pt.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(59,130,246,0.2), transparent)' }} />
    </section>
  )
}
