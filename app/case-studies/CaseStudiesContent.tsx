'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const caseStudies = [
  {
    client: 'OENA',
    category: 'Outbound System',
    color: '#3B82F6',
    glow: 'rgba(59,130,246,0.3)',
    headline: 'Outbound Performance — Last 4 Weeks',
    description: 'Live analytics dashboard across all active and completed campaigns. Shopify D2C outreach with zero bounces and precision-sourced lead data.',
    stats: [
      { value: '20,500+', label: 'Emails Sent' },
      { value: '1.47%', label: 'Reply Rate' },
      { value: '21', label: 'Opportunities' },
      { value: '0', label: 'Bounces' },
    ],
    highlights: [
      '479 decision-makers mapped from the Shopify 500 list',
      '2,136-row Beauty & Personal Care founder dataset',
      '44-brand TikTok Intelligence list (up to 13.9M followers)',
      '504 verified Shopify merchants sourced and enriched',
    ],
    combinedNote: null,
  },
  {
    client: 'Dayly Group',
    category: 'TikTok Shop Growth',
    color: '#06B6D4',
    glow: 'rgba(6,182,212,0.3)',
    headline: '$0 to $100K/Month in 90 Days',
    description: 'TikTok Shop creator program run end-to-end for ZYN (Health & Wellness) and HardyPaw (Pet Nutrition). Built from zero to a scalable shop infrastructure.',
    stats: [
      { value: '$0→$100K', label: 'Monthly Revenue (Month 3)' },
      { value: '90 days', label: 'Timeline' },
      { value: '11.17x', label: 'ROI on Ad Spend' },
      { value: '1,500+', label: 'Reviews Generated' },
    ],
    highlights: [
      'ZYN reached $100K/month within a 90-day timeline',
      'HardyPaw grew from $14,553 GMV to $103,094 GMV (Month 1 to Month 3)',
      '$150K+ total GMV across 90 days',
      '11.17x ROI on approximately $14K of ad spend',
    ],
    combinedNote: null,
  },
  {
    client: 'DTC Retail',
    category: 'Full Outbound Build',
    color: '#5B9FF5',
    glow: 'rgba(91,159,245,0.3)',
    headline: '$20K Revenue in 1.5 Months',
    description: 'Complete outbound system built end-to-end — from infrastructure to outreach. Cold email setup, ICP targeting, and sequences all built from scratch.',
    stats: [
      { value: '$20,000', label: 'Revenue Driven' },
      { value: '1.5mo', label: 'Time to Revenue' },
      { value: '100%', label: 'System Built' },
      { value: '0→Live', label: 'Infrastructure' },
    ],
    highlights: [
      'Complete outbound infrastructure built from zero',
      'Domain and mailbox warmup, ICP definition, and list building',
      'Email sequences, LinkedIn outreach, and CRM integration',
      '$20K in revenue within 1.5 months of launch',
    ],
    combinedNote: null,
  },
  {
    client: 'Technowis',
    category: 'Pay-Per-Meeting',
    color: '#06D4B6',
    glow: 'rgba(6,212,182,0.3)',
    headline: 'Meetings Booked on Performance',
    description: 'Outbound run end-to-end with Technowis paid only for meetings that actually get booked. Performance-based model targeting e-commerce brands.',
    stats: [
      { value: '2,911', label: 'Emails Sent' },
      { value: '1.49%', label: 'Reply Rate' },
      { value: '17.65%', label: 'Positive Reply Rate' },
      { value: '18m', label: 'Speed to Lead' },
    ],
    highlights: [
      'Pay-per-meeting model — zero risk, results only',
      '2,275 prospects reached across combined campaigns',
      '17.65% positive reply rate across all outbound',
      '18-minute speed to lead from reply to response',
    ],
    combinedNote: 'Combined with DTC Retail: 2,911 emails sent · 1.49% reply rate · 1.44% bounce rate',
  },
  {
    client: 'LKCV Consulting',
    category: 'Clay Signal System',
    color: '#8B5CF6',
    glow: 'rgba(139,92,246,0.3)',
    headline: '5.35% Reply Rate via Signal-Based Clay',
    description: 'Signal-based outreach system built in Clay with live campaign analytics. Industry-leading reply rates powered by precision intent data.',
    stats: [
      { value: '5.35%', label: 'Reply Rate' },
      { value: '62.5%', label: 'Positive Replies' },
      { value: '10', label: 'Opportunities' },
      { value: '$10K', label: 'Pipeline Value' },
    ],
    highlights: [
      '299 sequences started with surgical targeting',
      '16 total replies — 10 positive opportunities',
      '62.5% positive reply rate (industry benchmark: 15-20%)',
      '$10,000 pipeline opportunity value from one campaign',
    ],
    combinedNote: null,
  },
  {
    client: 'Fulcrum',
    category: 'Full GTM System',
    color: '#F59E0B',
    glow: 'rgba(245,158,11,0.3)',
    headline: '5 Months of Sustained Pipeline Growth',
    description: 'Complete GTM system built in Clay for a staffing and recruiting agency. Signal-based outreach, personalised reports, and CRM-ready data — all built in Clay.',
    stats: [
      { value: '5 months', label: 'Sustained Growth' },
      { value: 'Clay', label: 'Infrastructure' },
      { value: '100%', label: 'GTM Rebuilt' },
      { value: 'Multi', label: 'Active Campaigns' },
    ],
    highlights: [
      'Job ads sourced, enriched, and run through AI job-ad analysis',
      'Personalised report URL generated per prospect',
      'LinkedIn DM and campaign hand-off built per lead',
      'CRM chaos restructured into a clean, scalable pipeline',
    ],
    combinedNote: null,
  },
]

function CaseCard({ cs, index }: { cs: typeof caseStudies[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (!cardRef.current) return
    gsap.set(cardRef.current, { opacity: 0, y: 32 })
    ScrollTrigger.create({
      trigger: cardRef.current,
      start: 'top 85%',
      onEnter: () =>
        gsap.to(cardRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power3.out',
          delay: (index % 2) * 0.1,
        }),
    })
  }, [index])

  return (
    <div
      ref={cardRef}
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.07)',
        opacity: 0,
      }}
    >
      <div className="h-0.5" style={{ background: `linear-gradient(to right, ${cs.color}, transparent)` }} />

      <div className="p-8">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <span
              className="text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full inline-block mb-3"
              style={{ background: `${cs.color}15`, color: cs.color, border: `1px solid ${cs.color}30` }}
            >
              {cs.category}
            </span>
            <h2 className="text-2xl font-bold text-white">{cs.client}</h2>
            <p className="text-sm mt-1 font-medium" style={{ color: cs.color }}>{cs.headline}</p>
          </div>
        </div>

        <p className="text-sm leading-relaxed mb-8" style={{ color: '#64748B' }}>{cs.description}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {cs.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl p-4 text-center"
              style={{ background: `${cs.color}08`, border: `1px solid ${cs.color}20` }}
            >
              <p className="text-lg font-black tabular-nums leading-none mb-1" style={{ color: cs.color }}>
                {stat.value}
              </p>
              <p className="text-xs leading-tight" style={{ color: '#475569' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        <ul className="flex flex-col gap-2.5">
          {cs.highlights.map((h) => (
            <li key={h} className="flex items-start gap-3 text-sm" style={{ color: '#94A3B8' }}>
              <span
                className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
                style={{ background: cs.color, boxShadow: `0 0 6px ${cs.glow}` }}
              />
              {h}
            </li>
          ))}
        </ul>

        {cs.combinedNote && (
          <p
            className="mt-5 text-xs px-4 py-2.5 rounded-lg"
            style={{ color: '#475569', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}
          >
            {cs.combinedNote}
          </p>
        )}
      </div>
    </div>
  )
}

export default function CaseStudiesContent() {
  const headRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!headRef.current) return
    gsap.set(headRef.current, { opacity: 0, y: 24 })
    gsap.to(headRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 })
  }, [])

  return (
    <main
      className="min-h-screen px-6 py-24"
      style={{
        background: '#0A0A0A',
        backgroundImage:
          'radial-gradient(circle at 20% 20%, rgba(59,130,246,0.1) 0%, transparent 45%), radial-gradient(circle at 80% 80%, rgba(6,182,212,0.08) 0%, transparent 40%)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-10 text-xs" style={{ color: '#334155' }} aria-label="Breadcrumb">
          <ol style={{ display: 'flex', gap: 8, listStyle: 'none', padding: 0, margin: 0, alignItems: 'center' }}>
            <li>
              <Link href="/" style={{ color: '#3B82F6', textDecoration: 'none' }}>Home</Link>
            </li>
            <li style={{ color: '#1E293B' }}>›</li>
            <li>Case Studies</li>
          </ol>
        </nav>

        {/* Hero */}
        <div ref={headRef} className="mb-16" style={{ opacity: 0 }}>
          <span
            className="text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full inline-block mb-6"
            style={{ background: 'rgba(59,130,246,0.1)', color: '#3B82F6', border: '1px solid rgba(59,130,246,0.2)' }}
          >
            Client Results
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#F8FAFC' }}>
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
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: '#64748B' }}>
            Performance snapshots, straight from each client's own results. These are live analytics and verified numbers — not estimates.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {caseStudies.map((cs, i) => (
            <CaseCard key={cs.client} cs={cs} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div
          className="rounded-2xl p-10 text-center"
          style={{ background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.15)' }}
        >
          <h2 className="text-2xl font-bold text-white mb-3">Want results like these?</h2>
          <p className="text-sm mb-8" style={{ color: '#64748B', maxWidth: 480, margin: '0 auto 2rem' }}>
            Every engagement starts with a free 30-minute call. We'll map out exactly what a signal-based GTM system looks like for your market.
          </p>
          <a
            href="https://calendly.com/book-strategycall-sigflow-wijdan"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow text-sm px-8 py-3.5"
            style={{ display: 'inline-block', textDecoration: 'none' }}
          >
            Book a Free Strategy Call
          </a>
          <p className="mt-4 text-xs" style={{ color: '#334155' }}>We respond within 24 hours</p>
        </div>

        <div className="mt-12 text-center">
          <Link href="/" style={{ color: '#3B82F6', textDecoration: 'none', fontSize: 14 }}>
            Back to Sigflow GTM
          </Link>
        </div>
      </div>
    </main>
  )
}
