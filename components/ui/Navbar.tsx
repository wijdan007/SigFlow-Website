'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import GlassPanel from './GlassPanel'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Results', href: '#results' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLinkClick = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ padding: scrolled ? '10px 0' : '18px 0' }}
    >
      {scrolled ? (
        <GlassPanel
          cornerRadius={0}
          blurAmount={18}
          style={{ width: '100%' }}
          className="w-full"
        >
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-2">
            <NavContent handleLinkClick={handleLinkClick} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
          </div>
        </GlassPanel>
      ) : (
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <NavContent handleLinkClick={handleLinkClick} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        </div>
      )}

      {/* Mobile drawer */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pt-4 pb-6 flex flex-col gap-5 bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-[rgba(59,130,246,0.1)]">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.href)}
              className="text-[#94A3B8] hover:text-white text-base font-medium transition-colors text-left"
            >
              {link.label}
            </button>
          ))}
          <a
            href="https://calendly.com/book-strategycall-sigflow-wijdan"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow text-sm px-5 py-3 w-fit"
            onClick={() => setMobileOpen(false)}
          >
            Book a Call
          </a>
        </div>
      </div>
    </nav>
  )
}

function NavContent({
  handleLinkClick,
  mobileOpen,
  setMobileOpen,
}: {
  handleLinkClick: (href: string) => void
  mobileOpen: boolean
  setMobileOpen: (v: boolean) => void
}) {
  return (
    <>
      {/* Logo */}
      <a href="#" className="flex items-center gap-2.5 group">
        <div
          className="flex items-center justify-center rounded-[10px] flex-shrink-0"
          style={{
            width: 34, height: 34,
            background: 'linear-gradient(135deg, #2563EB, #0891B2)',
            boxShadow: '0 4px 14px rgba(59,130,246,0.35)',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="68" r="7" fill="white"/>
            <circle cx="50" cy="50" r="5.5" fill="rgba(255,255,255,0.7)"/>
            <circle cx="76" cy="32" r="7" fill="white"/>
            <path d="M24 68 Q37 59 50 50 Q63 41 76 32" stroke="white" strokeWidth="4" strokeLinecap="round" fill="none"/>
            <path d="M76 32 L69 27 M76 32 L71 39" stroke="white" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        </div>
        <span className="text-xl font-bold tracking-tight">
          <span className="text-white">Sigflow</span>
          <span className="text-[#3B82F6]"> GTM</span>
        </span>
      </a>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <button
            key={link.label}
            onClick={() => handleLinkClick(link.href)}
            className="text-[#94A3B8] hover:text-white text-sm font-medium transition-colors duration-200"
          >
            {link.label}
          </button>
        ))}
        <a
          href="https://calendly.com/book-strategycall-sigflow-wijdan"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-glow text-sm px-5 py-2.5"
        >
          Book a Call
        </a>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden text-white p-2"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
    </>
  )
}
