'use client'

import { useState, useRef, useEffect } from 'react'
import { Plus, Minus } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

const faqs = [
  {
    q: 'How quickly will I see results?',
    a: "Most clients start seeing results within 20-30 days of launch. Infrastructure is built in the first week, sequences go live in week 2, and pipeline activity picks up from there. No 90-day onboarding cycles.",
  },
  {
    q: 'What exactly is included in a GTM system build?',
    a: 'Everything: ICP definition, lead list building, signal tracking setup (40+ sources), domain and mailbox warmup, email sequences, LinkedIn outreach, CRM integration, and weekly optimization. You get a complete, running outbound engine — not a strategy doc.',
  },
  {
    q: 'Do I need to sign a long-term contract?',
    a: "No lock-in. We work on monthly retainers after an initial build sprint. If it is not working, you can walk away. We prefer it that way - it keeps us accountable to your results.",
  },
  {
    q: 'What buying signals do you track?',
    a: 'Job postings (hiring SDRs, AEs, RevOps), funding announcements, tech stack changes, LinkedIn activity, website visits, CRM data triggers, news mentions, and more. We prioritize the signals that correlate with purchase intent in your specific market.',
  },
  {
    q: 'What tools do you use?',
    a: 'Clay, Apollo, HubSpot, Salesforce, Instantly, Lemlist, Smartlead, n8n, Make, LinkedIn Sales Navigator — and more depending on your stack. We build in your existing tools where possible, or recommend the leanest stack for your stage.',
  },
  {
    q: 'How is Sigflow different from a typical lead gen agency?',
    a: 'Most agencies send cold email blasts to scraped lists. We build a precision targeting engine using real-time intent data. Your prospects are reached the week they raise funding, hire a new sales leader, or change their tech stack — not at random.',
  },
  {
    q: 'What does it cost?',
    a: "Pricing depends on your target market size, tech stack complexity, and monthly volume. Book a call and we will give you a tailored breakdown - usually in the 30-minute conversation itself.",
  },
  {
    q: 'Can you work with our existing CRM and team?',
    a: 'Yes. We integrate with HubSpot and Salesforce out of the box, and can work alongside your existing SDR or sales team. We also offer async handoff — meetings land directly in your calendar.',
  },
]

function FAQItem({ q, a, open, toggle }: { q: string; a: string; open: boolean; toggle: () => void }) {
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!bodyRef.current) return
    if (open) {
      gsap.fromTo(bodyRef.current, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.32, ease: 'power2.out' })
    } else {
      gsap.to(bodyRef.current, { height: 0, opacity: 0, duration: 0.22, ease: 'power2.in' })
    }
  }, [open])

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        border: '1px solid ' + (open ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.07)'),
        background: open ? 'rgba(59,130,246,0.04)' : 'rgba(255,255,255,0.02)',
        transition: 'border-color 0.2s, background 0.2s',
      }}
    >
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left cursor-pointer"
      >
        <h3 className="text-white font-semibold text-base leading-snug">{q}</h3>
        <div
          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
          style={{ background: open ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.05)', marginTop: 2 }}
        >
          {open ? <Minus size={13} style={{ color: '#3B82F6' }} /> : <Plus size={13} style={{ color: '#94A3B8' }} />}
        </div>
      </button>
      <div ref={bodyRef} style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
        <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: '#94A3B8' }}>{a}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)
  const headRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (!headRef.current) return
    gsap.set(headRef.current, { opacity: 0, y: 28 })
    ScrollTrigger.create({
      trigger: headRef.current,
      start: 'top 85%',
      onEnter: () => gsap.to(headRef.current, { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' }),
    })
  }, [])

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="py-28 px-6"
      style={{
        background: '#0A0A0A',
        backgroundImage: 'radial-gradient(circle at 90% 10%, rgba(59,130,246,0.1) 0%, transparent 40%), radial-gradient(circle at 5% 90%, rgba(6,182,212,0.08) 0%, transparent 40%)',
      }}
    >
      {/* JSON-LD for FAQ rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(({ q, a }) => ({
              '@type': 'Question',
              name: q,
              acceptedAnswer: { '@type': 'Answer', text: a },
            })),
          }),
        }}
      />

      <div className="max-w-3xl mx-auto">
        <div data-reveal ref={headRef} className="text-center mb-14" style={{ opacity: 0 }}>
          <span className="section-label">FAQ</span>
          <h2 className="text-4xl md:text-[48px] font-semibold leading-tight" style={{ color: '#F8FAFC' }}>
            Questions We{' '}
            <span style={{ background: 'linear-gradient(135deg, #3B82F6, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Always Get.
            </span>
          </h2>
          <p className="mt-4 text-base" style={{ color: '#64748B' }}>
            Still have something specific?{' '}
            <a href="https://calendly.com/book-strategycall-sigflow-wijdan" target="_blank" rel="noopener noreferrer" style={{ color: '#3B82F6' }}>
              Book a 30-min call
            </a>
            {' '}and ask us directly.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              q={faq.q}
              a={faq.a}
              open={openIdx === i}
              toggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </div>

        {/* Internal link to case studies */}
        <div className="mt-10 text-center">
          <p className="text-sm" style={{ color: '#475569' }}>
            Want proof?{' '}
            <Link href="/case-studies" style={{ color: '#3B82F6', textDecoration: 'none' }}>
              See our case studies →
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
