'use client'

import { useEffect, useState, type MouseEvent } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const CALENDLY = 'https://calendly.com/book-strategycall-sigflow-wijdan'

// Hash links point at homepage sections; plain paths are separate pages
const navLinks = [
  { label: 'Services', href: '/#services' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Results', href: '/#results' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'FAQ', href: '/#faq' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // While the mobile menu is open: lock page scroll, close on Escape or when resized to desktop
  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false) }
    const desktop = window.matchMedia('(min-width: 1024px)')
    const onResize = () => { if (desktop.matches) setMobileOpen(false) }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onResize)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onResize)
    }
  }, [mobileOpen])

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileOpen(false)
    document.body.style.overflow = ''
    if (!href.startsWith('/#') || pathname !== '/') return // let the browser navigate
    const el = document.querySelector(href.slice(1))
    if (!el) return
    e.preventDefault()
    el.scrollIntoView({ behavior: 'smooth' })
    history.replaceState(null, '', href.slice(1))
  }

  const handleLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
    setMobileOpen(false)
    if (pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const solid = scrolled || mobileOpen
  const barHeight = scrolled ? 64 : 76

  return (
    // While the menu is open, sit above the chat bubble and mobile CTA bar (z 9998/9999)
    <nav className={'fixed top-0 left-0 right-0 ' + (mobileOpen ? 'z-[10000]' : 'z-50')}>
      {/* Background on its own layer: backdrop-filter on <nav> itself would trap the fixed menu panel below */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 transition-[background-color,border-color] duration-300"
        style={{
          background: solid ? 'rgba(10,10,10,0.88)' : 'transparent',
          backdropFilter: solid ? 'blur(16px) saturate(160%)' : 'none',
          WebkitBackdropFilter: solid ? 'blur(16px) saturate(160%)' : 'none',
          borderBottom: '1px solid ' + (solid ? 'rgba(255,255,255,0.08)' : 'transparent'),
        }}
      />
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 transition-[height] duration-300"
        style={{ height: barHeight }}
      >
        {/* Logo */}
        <Link href="/" onClick={handleLogoClick} className="flex items-center gap-2.5 flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark.png" alt="" width={34} height={34} style={{ borderRadius: 8 }} />
          <span className="text-lg sm:text-xl font-bold tracking-tight whitespace-nowrap">
            <span className="text-white">Sigflow</span>
            <span className="text-[#3B82F6]"> GTM</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-7 xl:gap-8">
          {navLinks.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={'text-sm font-medium whitespace-nowrap transition-colors duration-200 ' + (active ? 'text-white' : 'text-[#94A3B8] hover:text-white')}
                aria-current={active ? 'page' : undefined}
              >
                {link.label}
              </Link>
            )
          })}
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-glow text-sm px-5 py-2.5">
            Book a Call
          </a>
        </div>

        {/* Tablet / mobile actions */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Phones get the sticky bottom CTA bar instead */}
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-glow hidden md:inline-flex text-sm px-4 py-2">
            Book a Call
          </a>
          <button
            type="button"
            className="text-white w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white/5 transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile / tablet menu: full-height solid panel under the bar */}
      <div
        id="mobile-menu"
        data-lenis-prevent
        className={
          'lg:hidden fixed inset-x-0 bottom-0 overflow-y-auto transition-[opacity,transform,visibility] duration-300 ' +
          (mobileOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible pointer-events-none')
        }
        style={{ top: barHeight, background: '#0A0A0A' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-2 pb-10 flex flex-col">
          {navLinks.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                tabIndex={mobileOpen ? 0 : -1}
                className={'py-4 text-lg font-medium border-b transition-colors ' + (active ? 'text-white' : 'text-[#CBD5E1] hover:text-white')}
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                aria-current={active ? 'page' : undefined}
              >
                {link.label}
              </Link>
            )
          })}
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={mobileOpen ? 0 : -1}
            className="btn-glow w-full mt-8"
            onClick={() => setMobileOpen(false)}
          >
            Book a Free Call
          </a>
          <p className="text-center text-xs mt-3" style={{ color: '#64748B' }}>
            We respond within 24 hours
          </p>
        </div>
      </div>
    </nav>
  )
}
