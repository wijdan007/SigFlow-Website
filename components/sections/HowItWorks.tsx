'use client'

import { useEffect, useRef } from 'react'
import GlassPanel from '@/components/ui/GlassPanel'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const steps = [
  {
    number: '01',
    title: 'Signal Capture',
    description:
      "We identify 40+ intent signals: job postings, tech stack changes, funding rounds, hiring patterns, website visits, and more. The full picture of who's ready to buy.",
    color: '#3B82F6',
    glow: 'rgba(59,130,246,0.45)',
  },
  {
    number: '02',
    title: 'ICP Matching',
    description:
      'We score and rank leads against your Ideal Customer Profile using enriched data and AI models. Only the highest-intent prospects rise to the top.',
    color: '#5B9FF5',
    glow: 'rgba(91,159,245,0.45)',
  },
  {
    number: '03',
    title: 'System Build',
    description:
      'We build your outbound sequences, copy, mailboxes, CRM workflows, and full GTM stack. Everything configured, tested, and ready to fire.',
    color: '#06B6D4',
    glow: 'rgba(6,182,212,0.45)',
  },
  {
    number: '04',
    title: 'Pipeline Delivered',
    description:
      'Qualified meetings land in your calendar. You close. We keep optimizing every sequence, signal, and touchpoint to compound your results over time.',
    color: '#06D4B6',
    glow: 'rgba(6,212,182,0.45)',
  },
]

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineFillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.registerPlugin(ScrollTrigger)
    if (!sectionRef.current) return

      const stepEls = sectionRef.current.querySelectorAll<HTMLElement>('.step-row')
      const dotEls = sectionRef.current.querySelectorAll<HTMLElement>('.step-dot')
      const contentEls = sectionRef.current.querySelectorAll<HTMLElement>('.step-content')
      const numEls = sectionRef.current.querySelectorAll<HTMLElement>('.step-num-display')

      // Start invisible
      gsap.set(contentEls, { opacity: 0, x: -28 })
      gsap.set(dotEls, { scale: 0.3, opacity: 0 })

      // Progress line fills as you scroll through the section
      if (lineFillRef.current) {
        gsap.set(lineFillRef.current, { scaleY: 0, transformOrigin: 'top center' })
        gsap.to(lineFillRef.current, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 55%',
            end: 'bottom 65%',
            scrub: 1,
          },
        })
      }

      // Per-step reveal
      stepEls.forEach((row, i) => {
        const dot = dotEls[i]
        const content = contentEls[i]
        const numEl = numEls[i]
        const stepNum = parseInt(steps[i].number)

        ScrollTrigger.create({
          trigger: row,
          start: 'top 78%',
          onEnter: () => {
            gsap.to(dot, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2.5)' })
            gsap.to(content, { opacity: 1, x: 0, duration: 0.65, ease: 'power3.out', delay: 0.06 })

            // Number count-up
            const obj = { v: 0 }
            gsap.to(obj, {
              v: stepNum,
              duration: 0.8,
              ease: 'power2.out',
              delay: 0.12,
              onUpdate: () => {
                if (numEl) numEl.textContent = String(Math.round(obj.v)).padStart(2, '0')
              },
            })
          },
        })
      })
  }, [])

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-28 px-6"
      style={{ background: '#0A0A0A', backgroundImage: 'radial-gradient(circle at 92% 8%, rgba(59,130,246,0.24) 0%, transparent 40%), radial-gradient(circle at 5% 55%, rgba(6,182,212,0.20) 0%, transparent 38%), radial-gradient(circle at 88% 90%, rgba(6,212,182,0.14) 0%, transparent 36%)' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-20">
          <span className="section-label">The Process</span>
          <h2
            className="text-4xl md:text-[48px] font-semibold leading-tight"
            style={{ color: '#F8FAFC' }}
          >
            From Zero to Pipeline{' '}
            <span style={{ color: '#06B6D4' }}>in 20-30 Days.</span>
          </h2>
        </div>

        {/* Timeline grid */}
        <div className="relative">
          {/* Vertical track line */}
          <div
            className="absolute top-4"
            style={{ left: '27px', width: '2px', bottom: '16px', zIndex: 0, background: 'rgba(255,255,255,0.05)', borderRadius: '1px' }}
            aria-hidden
          />
          {/* Animated fill line */}
          <div
            ref={lineFillRef}
            className="absolute top-4"
            style={{
              left: '27px',
              width: '2px',
              bottom: '16px',
              zIndex: 1,
              background: 'linear-gradient(to bottom, #3B82F6 0%, #06B6D4 55%, #06D4B6 100%)',
              borderRadius: '1px',
              transformOrigin: 'top center',
            }}
            aria-hidden
          />

          {/* Steps */}
          <div className="flex flex-col gap-16">
            {steps.map((step, i) => (
              <div key={step.number} className="step-row flex items-start gap-8 relative">
                {/* Glowing dot */}
                <div data-reveal
                  className="step-dot flex-shrink-0 relative"
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    zIndex: 2,
                    background: 'radial-gradient(circle at 40% 40%, ' + step.color + '22, ' + step.color + '08)',
                    border: '1.5px solid ' + step.color + '55',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 20px ' + step.glow,
                    opacity: 0,
                  }}
                >
                  <span
                    className="step-num-display font-black tabular-nums"
                    style={{ fontSize: '14px', color: step.color, lineHeight: 1, letterSpacing: '0.04em' }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div data-reveal
                  className="step-content flex-1"
                  style={{ opacity: 0 }}
                >
                  <GlassPanel cornerRadius={16} blurAmount={16} style={{ borderLeft: '2px solid ' + step.color + '55' }}>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          style={{
                            width: '24px',
                            height: '1px',
                            background: 'linear-gradient(to right, ' + step.color + ', transparent)',
                            flexShrink: 0,
                          }}
                        />
                        <h3
                          className="text-2xl md:text-3xl font-bold"
                          style={{ color: step.color }}
                        >
                          {step.title}
                        </h3>
                      </div>

                      <p
                        className="text-base leading-[1.85]"
                        style={{ color: '#94A3B8', maxWidth: '540px' }}
                      >
                        {step.description}
                      </p>

                      {/* Ghost number accent */}
                      <div
                        className="mt-4 font-black leading-none select-none"
                        style={{
                          fontSize: 'clamp(40px, 5vw, 68px)',
                          background: 'linear-gradient(135deg, ' + step.color + '20, ' + step.color + '06)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          lineHeight: 1,
                        }}
                        aria-hidden
                      >
                        {step.number}
                      </div>
                    </div>
                  </GlassPanel>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
