'use client'

import { useEffect, useRef } from 'react'
import { Webhook } from 'lucide-react'
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

type Tool = { name: string; logo?: string }

// Logos are self-hosted in /public/logos (Brandfetch blocks hotlinking without an API key)
const categories: { label: string; tools: Tool[] }[] = [
  {
    label: 'Signals & Research',
    tools: [
      { name: 'Trigify.io',  logo: 'trigify' },
      { name: 'Twain',       logo: 'twain' },
      { name: 'Clay',        logo: 'clay' },
      { name: 'Common Room', logo: 'commonroom' },
      { name: 'BuiltWith',   logo: 'builtwith' },
    ],
  },
  {
    label: 'Prospecting',
    tools: [
      { name: 'LinkedIn', logo: 'linkedin' },
      { name: 'Prospeo',  logo: 'prospeo' },
      { name: 'Apollo',   logo: 'apollo' },
      { name: 'ZoomInfo', logo: 'zoominfo' },
    ],
  },
  {
    label: 'Sequencing',
    tools: [
      { name: 'HeyReach',     logo: 'heyreach' },
      { name: 'Instantly',    logo: 'instantly' },
      { name: 'EmailBison',   logo: 'emailbison' },
      { name: 'lemlist',      logo: 'lemlist' },
      { name: 'Smartlead.ai', logo: 'smartlead' },
    ],
  },
  {
    label: 'CRM & Data',
    tools: [
      { name: 'HubSpot',    logo: 'hubspot' },
      { name: 'Salesforce', logo: 'salesforce' },
      { name: 'Attio',      logo: 'attio' },
      { name: 'Pipedrive',  logo: 'pipedrive' },
      { name: 'Airtable',   logo: 'airtable' },
    ],
  },
  {
    label: 'Automation',
    tools: [
      { name: 'Make',     logo: 'make' },
      { name: 'Zapier',   logo: 'zapier' },
      { name: 'n8n',      logo: 'n8n' },
      { name: 'Webhooks' },
    ],
  },
  {
    label: 'Enrichment',
    tools: [
      { name: 'Hunter',          logo: 'hunter' },
      { name: 'Findymail',       logo: 'findymail' },
      { name: 'Reoon',           logo: 'reoon' },
      { name: 'Icypeas',         logo: 'icypeas' },
      { name: 'MillionVerifier', logo: 'millionverifier' },
    ],
  },
]

function ToolChip({ tool }: { tool: Tool }) {
  return (
    <li className="tool-flip flex items-center gap-3 min-w-0">
      <span className="tool-flip-inner flex-shrink-0 w-8 h-8 rounded-lg bg-white flex items-center justify-center overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
        {tool.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={`/logos/${tool.logo}.png`} alt="" width={24} height={24} loading="lazy" className="w-6 h-6 object-contain" />
        ) : (
          <Webhook size={18} className="text-[#3B82F6]" aria-hidden />
        )}
      </span>
      <span className="text-sm font-semibold text-gray-700 leading-tight break-words min-w-0">{tool.name}</span>
    </li>
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
        <div data-reveal ref={headingRef} className="mb-16" style={{ opacity: 0 }}>
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
        <div data-reveal
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
                <div data-reveal key={step.number} className="step-item flex flex-col gap-3" style={{ opacity: 0 }}>
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

        {/* Tool grid: one cell per category so tools always sit under the right heading */}
        <div
          ref={gridRef}
          className="rounded-2xl overflow-hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-px"
          style={{ background: 'rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.06)' }}
        >
          {categories.map((cat) => (
            <div key={cat.label} data-reveal className="tool-col p-5 xl:p-6" style={{ background: '#F8FAFC', opacity: 0 }}>
              <h3 className="text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: '#64748B' }}>
                {cat.label}
              </h3>
              <ul className="grid grid-cols-2 sm:grid-cols-1 gap-x-4 gap-y-3">
                {cat.tools.map((tool) => (
                  <ToolChip key={tool.name} tool={tool} />
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
