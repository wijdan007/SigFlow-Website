'use client'

import { useEffect, useRef, MouseEvent } from 'react'
import { Zap, Settings, Target } from 'lucide-react'
import GlassPanel from '@/components/ui/GlassPanel'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const services = [
  {
    icon: Zap,
    title: 'Outbound Systems',
    description:
      'We build your full cold outbound infrastructure: sequences, mailboxes, copywriting, and precision targeting. Turnkey and battle-tested.',
    delay: 0,
  },
  {
    icon: Settings,
    title: 'GTM Engineering',
    description:
      'We engineer your go-to-market stack using Clay, signal enrichment, ICP scoring, and CRM sync. Your tech stack, fully orchestrated.',
    delay: 0.15,
  },
  {
    icon: Target,
    title: 'Signal-Based Targeting',
    description:
      'We use 40+ buying signals to identify and prioritize leads most likely to convert right now. Reach the right people at the right moment.',
    delay: 0.3,
  },
]

function FlipCard({
  icon: Icon,
  title,
  description,
  delay,
  index,
}: {
  icon: React.ElementType
  title: string
  description: string
  delay: number
  index: number
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.registerPlugin(ScrollTrigger)
    if (!innerRef.current) return
    gsap.set(innerRef.current, {
      rotateY: 90,
      opacity: 0,
      transformOrigin: 'left center',
    })
    ScrollTrigger.create({
      trigger: wrapRef.current,
      start: 'top 82%',
      onEnter: () => {
        gsap.to(innerRef.current, {
          rotateY: 0,
          opacity: 1,
          duration: 0.85,
          delay,
          ease: 'power3.out',
        })
      },
    })
  }, [delay])

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!innerRef.current) return
    const rect = innerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    innerRef.current.style.transform = 'perspective(1000px) rotateY(' + (x * 7) + 'deg) rotateX(' + (-y * 5) + 'deg) translateZ(10px)'
  }

  const handleMouseLeave = () => {
    if (!innerRef.current) return
    innerRef.current.style.transform =
      'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)'
  }

  return (
    <div ref={wrapRef} style={{ perspective: '1200px' }}>
      <div
        ref={innerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="rounded-2xl"
        style={{
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          cursor: 'default',
        }}
      >
        <GlassPanel cornerRadius={16} blurAmount={14}>
          <div className="p-8 flex flex-col gap-5 h-full">
            {/* Icon */}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(59, 130, 246, 0.2)' }}
            >
              <Icon size={22} className="text-[#3B82F6]" />
            </div>

            {/* Number accent */}
            <div
              className="text-6xl font-black leading-none select-none"
              style={{
                background: 'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(6,182,212,0.15))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontVariantNumeric: 'tabular-nums',
                lineHeight: 1,
              }}
            >
              0{index + 1}
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
              <p className="text-[#94A3B8] leading-[1.75] text-base">{description}</p>
            </div>
          </div>
        </GlassPanel>
      </div>
    </div>
  )
}

export default function WhatWeDo() {
  const headingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.registerPlugin(ScrollTrigger)
    if (!headingRef.current) return
    gsap.set(headingRef.current, { opacity: 0, y: 35 })
    ScrollTrigger.create({
      trigger: headingRef.current,
      start: 'top 85%',
      onEnter: () =>
        gsap.to(headingRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }),
    })
  }, [])

  return (
    <section id="services" className="py-28 px-6" style={{ background: '#0A0A0A', backgroundImage: 'radial-gradient(circle at 8% 15%, rgba(59,130,246,0.28) 0%, transparent 40%), radial-gradient(circle at 90% 85%, rgba(6,182,212,0.22) 0%, transparent 38%), radial-gradient(circle at 52% 55%, rgba(139,92,246,0.14) 0%, transparent 36%)' }}>
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} className="text-center mb-16" style={{ opacity: 0 }}>
          <span className="section-label">Our Services</span>
          <h2
            className="text-4xl md:text-[48px] font-semibold leading-tight"
            style={{ color: '#F8FAFC' }}
          >
            Built for Revenue.{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #3B82F6, #06B6D4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Engineered for Scale.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <FlipCard key={s.title} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
