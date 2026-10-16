'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { isWebGLAvailable } from '@/lib/webgl-check'

const FlythroughCanvas = dynamic(
  () => import('@/components/three/FlythroughCanvas'),
  { ssr: false, loading: () => null }
)

const ParticleBackground = dynamic(
  () => import('@/components/ui/ParticleBackground'),
  { ssr: false, loading: () => null }
)

export default function Hero() {
  const [webgl, setWebgl] = useState(false)
  const [mounted, setMounted] = useState(false)
  const labelRef = useRef<HTMLSpanElement>(null)
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const btnsRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setWebgl(isWebGLAvailable())
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const init = async () => {
      const { gsap } = await import('gsap')
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Label char-by-char
      if (labelRef.current) {
        const text = labelRef.current.textContent || ''
        labelRef.current.innerHTML = text
          .split('')
          .map((c) =>
            c === ' '
              ? '<span style="display:inline-block;width:0.3em"> </span>'
              : `<span style="display:inline-block;opacity:0;transform:translateY(12px)">${c}</span>`
          )
          .join('')
        const chars = labelRef.current.querySelectorAll('span')
        tl.to(chars, { opacity: 1, y: 0, duration: 0.04, stagger: 0.04 }, 0.1)
      }

      // Headline lines clip-reveal
      const lines = [line1Ref.current, line2Ref.current].filter(Boolean)
      lines.forEach((el) => {
        if (el) {
          gsap.set(el, { opacity: 0, y: 55, skewX: -2 })
        }
      })
      tl.to(lines, { opacity: 1, y: 0, skewX: 0, duration: 0.9, stagger: 0.18 }, 0.55)

      // Sub
      if (subRef.current) {
        gsap.set(subRef.current, { opacity: 0, y: 25 })
        tl.to(subRef.current, { opacity: 1, y: 0, duration: 0.7 }, 1.05)
      }

      // Buttons
      if (btnsRef.current) {
        const btns = btnsRef.current.children
        gsap.set(btns, { opacity: 0, y: 20, scale: 0.95 })
        tl.to(btns, { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.1 }, 1.25)
      }

      // Scroll hint
      if (scrollHintRef.current) {
        gsap.set(scrollHintRef.current, { opacity: 0 })
        tl.to(scrollHintRef.current, { opacity: 1, duration: 0.8 }, 1.6)
        // Pulse the dot
        gsap.to(scrollHintRef.current.querySelector('.hint-dot'), {
          y: 10,
          duration: 1.2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: 1.8,
        })
      }
    }
    init()
  }, [mounted])

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#0A0A0A' }}
    >
      {/* Particle layer */}
      {mounted && (
        <div className="absolute inset-0 z-0">
          <ParticleBackground />
        </div>
      )}

      {/* 3D Flythrough canvas — full viewport */}
      {mounted && (
        <div
          className="absolute inset-0 z-1 pointer-events-none"
          style={{ opacity: webgl ? 1 : 0 }}
        >
          {webgl && <FlythroughCanvas />}
        </div>
      )}

      {/* Fallback gradient if no WebGL */}
      {!webgl && mounted && (
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 60% 50%, rgba(59,130,246,0.12) 0%, transparent 70%)',
          }}
        />
      )}

      {/* Left glow */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 20% 50%, rgba(59,130,246,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 w-full">
        <div className="max-w-[680px]">
          {/* Label */}
          <span
            ref={labelRef}
            className="section-label mb-5"
            style={{ display: 'block' }}
          >
            The GTM Hospital
          </span>

          {/* Headline */}
          <h1
            className="text-5xl md:text-[72px] font-extrabold uppercase leading-[1.05] tracking-tight mb-7"
            style={{ color: '#F8FAFC', overflow: 'hidden' }}
          >
            <span
              ref={line1Ref}
              className="block"
              style={{ opacity: 0 }}
            >
              Bring Your{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #3B82F6, #06B6D4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Broken GTM.
              </span>
            </span>
            <span
              ref={line2Ref}
              className="block"
              style={{ opacity: 0 }}
            >
              We&apos;ll{' '}
              <span className="text-[#06B6D4]">Fix It Together.</span>
            </span>
          </h1>

          {/* Sub */}
          <p
            ref={subRef}
            className="text-lg md:text-xl leading-[1.75] mb-11 max-w-xl"
            style={{ color: '#94A3B8', opacity: 0 }}
          >
            Bring your broken and chaotic outbound and CRM system.{' '}
            <span className="text-white font-medium">We&apos;ll fix it together.</span>{' '}
            Signal-driven GTM that actually converts.
          </p>

          {/* Buttons */}
          <div ref={btnsRef} className="flex flex-col sm:flex-row flex-wrap gap-4">
            <a
              href="https://calendly.com/book-strategycall-sigflow-wijdan"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow"
              data-magnetic
              style={{ opacity: 0 }}
            >
              Book a Free Call
            </a>
            <button
              className="btn-ghost"
              data-magnetic
              style={{ opacity: 0 }}
              onClick={() => scrollTo('#how-it-works')}
            >
              See How It Works
            </button>
          </div>

          {/* Response time promise */}
          <div className="flex items-center gap-2 mt-5">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#22C55E', boxShadow: '0 0 6px #22C55E' }} />
            <span className="text-sm" style={{ color: '#64748B' }}>
              We respond within <span className="font-semibold" style={{ color: '#94A3B8' }}>24 hours</span> — usually same day
            </span>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        style={{ opacity: 0 }}
      >
        <span
          className="text-xs font-medium tracking-widest uppercase"
          style={{ color: '#94A3B8' }}
        >
          Scroll
        </span>
        <div
          className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5"
          style={{ borderColor: 'rgba(148,163,184,0.3)' }}
        >
          <div
            className="hint-dot w-1 h-1 rounded-full"
            style={{ background: '#3B82F6' }}
          />
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #0A0A0A)' }}
      />
    </section>
  )
}
