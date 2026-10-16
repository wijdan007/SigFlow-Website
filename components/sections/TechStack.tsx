'use client'

import { useEffect, useRef } from 'react'
import GlassPanel from '@/components/ui/GlassPanel'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const strategySteps = [
  {
    number: '01',
    title: 'Market Intelligence',
    desc: 'We map your ICP with precision: industry, company size, tech stack, buying triggers, and org signals that separate ready buyers from everyone else.',
  },
  {
    number: '02',
    title: 'Offer Architecture',
    desc: 'We reverse-engineer your offer from the pain. One-line value prop, objection handling baked into the copy, and a hook that earns the reply.',
  },
  {
    number: '03',
    title: 'Channel and Signal Mix',
    desc: 'Cold email, LinkedIn, or both, chosen by where your buyers actually respond. 40+ intent signals determine who gets reached and when.',
  },
  {
    number: '04',
    title: 'Sequence Design',
    desc: 'Multi-touch cadences built around signal timing, not spray-and-pray volume. Every touchpoint earns its place with a specific job to do.',
  },
]

const categories = [
  {
    label: 'Signals & Research',
    tools: [
      { name: 'Trigify.io',  domain: 'trigify.io' },
      { name: 'Twain',       domain: null, logo: 'data:image/png;base64,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' },
      { name: 'Clay',        domain: 'clay.com' },
      { name: 'Common Room', domain: 'commonroom.io' },
      { name: 'BuiltWith',   domain: 'builtwith.com' },
    ],
  },
  {
    label: 'Prospecting',
    tools: [
      { name: 'LinkedIn',  domain: 'linkedin.com' },
      { name: 'Prospeo',   domain: 'prospeo.io' },
      { name: 'Apollo',    domain: 'apollo.io' },
      { name: 'ZoomInfo',  domain: 'zoominfo.com' },
      { name: 'Clay',      domain: 'clay.com' },
    ],
  },
  {
    label: 'Sequencing',
    tools: [
      { name: 'heyreach',     domain: 'heyreach.io' },
      { name: 'instantly',    domain: 'instantly.ai' },
      { name: 'EmailBison',   domain: 'emailbison.com' },
      { name: 'lemlist',      domain: 'lemlist.com' },
      { name: 'Smartlead.ai', domain: 'smartlead.ai' },
    ],
  },
  {
    label: 'CRM & Data',
    tools: [
      { name: 'HubSpot',    domain: 'hubspot.com' },
      { name: 'Salesforce', domain: 'salesforce.com' },
      { name: 'Attio',      domain: 'attio.com' },
      { name: 'Pipedrive',  domain: 'pipedrive.com' },
      { name: 'Airtable',   domain: 'airtable.com' },
    ],
  },
  {
    label: 'Automation',
    tools: [
      { name: 'Clay',     domain: 'clay.com' },
      { name: 'Make',     domain: 'make.com' },
      { name: 'Zapier',   domain: 'zapier.com' },
      { name: 'n8n',      domain: 'n8n.io' },
      { name: 'webhooks', domain: null },
    ],
  },
  {
    label: 'Enrichment',
    tools: [
      { name: 'hunter',          domain: 'hunter.io' },
      { name: 'Findymail',       domain: 'findymail.com' },
      { name: 'reoon',           domain: 'reoon.com' },
      { name: 'icypeas',         domain: 'icypeas.com' },
      { name: 'MillionVerifier', domain: 'millionverifier.com' },
    ],
  },
]

function BrandLogo({ domain, name, logo }: { domain: string | null; name: string; logo?: string }) {
  const src = logo || (domain ? 'https://cdn.brandfetch.io/' + domain + '/w/400/h/400/logo' : null)
  return (
    <div className="flex flex-col items-center gap-2 w-full px-3">
      {src && (
        <img
          src={src}
          alt={name}
          className="max-h-8 max-w-[120px] object-contain"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
      )}
      <span className="text-xs font-semibold text-gray-600 text-center leading-tight">{name}</span>
    </div>
  )
}

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const strategyRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
        gsap.fromTo(headingRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: headingRef.current, start: 'top 82%' } }
        )
        gsap.fromTo(strategyRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out',
            scrollTrigger: { trigger: strategyRef.current, start: 'top 80%' } }
        )
        const steps = stepsRef.current?.querySelectorAll('.step-item')
        if (steps?.length) {
          gsap.fromTo(steps, { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.12,
              scrollTrigger: { trigger: stepsRef.current, start: 'top 78%' } }
          )
        }
        const cols = gridRef.current?.querySelectorAll('.tool-col')
        if (cols?.length) {
          gsap.fromTo(cols, { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', stagger: 0.07,
              scrollTrigger: { trigger: gridRef.current, start: 'top 82%' } }
          )
        }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="tech-stack" ref={sectionRef} className="py-28 px-6" style={{ background: '#0A0A0A', backgroundImage: 'radial-gradient(circle at 6% 8%, rgba(59,130,246,0.22) 0%, transparent 40%), radial-gradient(circle at 94% 30%, rgba(6,182,212,0.16) 0%, transparent 38%)' }}>
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div ref={headingRef} className="mb-16" style={{ opacity: 0 }}>
          <span className="section-label mb-4 block">Tools and Methods</span>
          <h2
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5"
            style={{ color: '#F8FAFC', textWrap: 'balance' } as React.CSSProperties}
          >
            The full stack we run.{' '}
            <span style={{ background: 'linear-gradient(135deg,#3B82F6,#06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Strategy first.
            </span>
          </h2>
          <p className="text-[#94A3B8] text-lg max-w-2xl">
            Every tool serves a decision. We define the strategy before touching any platform,
            then deploy the right stack for your market.
          </p>
        </div>

        {/* Strategy panel */}
        <div
          ref={strategyRef}
          className="mb-10"
          style={{ opacity: 0 }}
        >
        <GlassPanel cornerRadius={20} blurAmount={16} className="w-full" style={{ width: '100%' }}>
          <div className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-6 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(180deg,#3B82F6,#06B6D4)' }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#3B82F6' }}>
                How We Define Strategy
              </span>
            </div>
            <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {strategySteps.map((step) => (
                <div key={step.number} className="step-item flex flex-col gap-3" style={{ opacity: 0 }}>
                  <span className="text-[11px] font-bold tracking-widest" style={{ color: '#3B82F6', fontFamily: "'Space Mono', monospace" }}>
                    {step.number}
                  </span>
                  <h3 className="text-[15px] font-bold text-white">{step.title}</h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: '#64748B' }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </GlassPanel>
        </div>

        {/* Tool grid — white cards matching screenshot */}
        <div
          ref={gridRef}
          className="rounded-2xl overflow-hidden"
          style={{ background: '#F8FAFC', border: '1px solid rgba(0,0,0,0.06)' }}
        >
          {/* Column headers */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-b" style={{ borderColor: 'rgba(0,0,0,0.07)' }}>
            {categories.map((cat) => (
              <div key={cat.label} className="px-5 py-4 border-r last:border-r-0" style={{ borderColor: 'rgba(0,0,0,0.07)' }}>
                <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: '#94A3B8' }}>
                  {cat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Tool rows */}
          {[0, 1, 2, 3, 4].map((rowIdx) => (
            <div key={rowIdx} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-b last:border-b-0" style={{ borderColor: 'rgba(0,0,0,0.07)' }}>
              {categories.map((cat) => {
                const tool = cat.tools[rowIdx]
                return (
                  <div
                    key={cat.label + rowIdx}
                    className="tool-col tool-flip flex items-center justify-center px-5 py-5 border-r last:border-r-0 cursor-default"
                    style={{ borderColor: 'rgba(0,0,0,0.07)', opacity: 0 }}
                  >
                    <div className="tool-flip-inner w-full flex items-center justify-center">
                      {tool ? <BrandLogo domain={tool.domain} name={tool.name} logo={(tool as any).logo} /> : <div className="h-10" />}
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
