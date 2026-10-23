'use client'

import Link from 'next/link'
import { MapPin, Mail, ExternalLink, Linkedin, Twitter } from 'lucide-react'

const sections: { title: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    title: 'Services',
    links: [
      { label: 'Outbound Systems', href: '/#services' },
      { label: 'GTM Engineering', href: '/#services' },
      { label: 'Signal-Based Targeting', href: '/#services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'How It Works', href: '/#how-it-works' },
      { label: 'Results', href: '/#results' },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Blog', href: '/blog' },
      { label: 'FAQ', href: '/#faq' },
    ],
  },
  {
    title: 'Get Started',
    links: [
      { label: 'Book a Strategy Call', href: 'https://calendly.com/book-strategycall-sigflow-wijdan', external: true },
      { label: 'Email Us', href: 'mailto:ceo@sigflowgtm.com', external: true },
    ],
  },
]

export default function Footer() {
  const scrollTo = (href: string) => {
    if (href.startsWith('/#')) {
      const el = document.querySelector(href.replace('/', ''))
      if (el) { el.scrollIntoView({ behavior: 'smooth' }); return }
      window.location.href = href
    }
  }

  return (
    <footer
      className="pt-16 pb-8 px-6"
      style={{ background: '#060608', borderTop: '1px solid rgba(59,130,246,0.12)' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1.8fr_1fr_1fr_1fr] gap-10 mb-14">

          {/* Brand col */}
          <div>
            <a href="/" className="flex items-center gap-2.5 mb-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-mark.png"
                alt="Sigflow GTM"
                width={32}
                height={32}
                style={{ borderRadius: 8, flexShrink: 0 }}
              />
              <span className="text-lg font-bold">
                <span className="text-white">Sigflow</span>
                <span className="text-[#3B82F6]"> GTM</span>
              </span>
            </a>
            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: '#94A3B8' }}>
              Signal-driven go-to-market for modern B2B teams. We build the outbound engine, you close the deals.
            </p>

            {/* Location + Maps */}
            <a
              href="https://maps.google.com/?q=United+Arab+Emirates"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs mb-2 hover:text-white transition-colors"
              style={{ color: '#64748B', textDecoration: 'none' }}
            >
              <MapPin size={12} style={{ color: '#3B82F6' }} />
              Dubai, UAE · Remote-first, global clients
              <ExternalLink size={10} style={{ marginLeft: 2, opacity: 0.5 }} />
            </a>
            <a
              href="mailto:ceo@sigflowgtm.com"
              className="flex items-center gap-2 text-xs hover:text-white transition-colors"
              style={{ color: '#64748B', textDecoration: 'none' }}
            >
              <Mail size={12} style={{ color: '#3B82F6' }} />
              ceo@sigflowgtm.com
            </a>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://www.linkedin.com/company/sigflow-gtm/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex items-center justify-center rounded-lg transition-colors"
                style={{ width: 34, height: 34, background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)', color: '#3B82F6' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(59,130,246,0.18)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(59,130,246,0.08)')}
              >
                <Linkedin size={15} />
              </a>
              <a
                href="https://x.com/SigFlowGTM"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="flex items-center justify-center rounded-lg transition-colors"
                style={{ width: 34, height: 34, background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)', color: '#3B82F6' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(59,130,246,0.18)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(59,130,246,0.08)')}
              >
                <Twitter size={15} />
              </a>
            </div>

            {/* Response time promise */}
            <div className="flex items-center gap-2 mt-4">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#22C55E' }} />
              <span className="text-[11px]" style={{ color: '#64748B' }}>Responds within 24 hours</span>
            </div>
          </div>

          {/* Link columns */}
          {sections.map((sec) => (
            <div key={sec.title}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: '#64748B' }}>
                {sec.title}
              </p>
              <ul className="flex flex-col gap-3">
                {sec.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:text-white transition-colors inline-flex items-center"
                        style={{ color: '#94A3B8', textDecoration: 'none' }}
                      >
                        {link.label}
                      </a>
                    ) : link.href.startsWith('/#') ? (
                      <button
                        onClick={() => scrollTo(link.href)}
                        className="text-sm hover:text-white transition-colors text-left"
                        style={{ color: '#94A3B8' }}
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm hover:text-white transition-colors inline-flex items-center"
                        style={{ color: '#94A3B8', textDecoration: 'none' }}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px mb-6" style={{ background: 'rgba(255,255,255,0.04)' }} />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: '#64748B' }}>
            © 2026 Sigflow GTM. All rights reserved.
          </p>
          <div className="flex gap-5">
            {['Privacy Policy', 'Terms of Service'].map((t) => (
              <span key={t} className="text-xs cursor-default" style={{ color: '#64748B' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
