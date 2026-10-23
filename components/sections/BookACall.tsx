'use client'

import GlassPanel from '@/components/ui/GlassPanel'

export default function BookACall() {
  return (
    <section
      id="book-a-call"
      className="py-32 px-6 relative overflow-hidden"
      style={{ background: '#0A0A0A' }}
    >
      {/* Glow blobs */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(59,130,246,0.30) 0%, transparent 65%)',
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 50% 50% at 20% 80%, rgba(6,182,212,0.20) 0%, transparent 60%)',
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 40% 40% at 80% 20%, rgba(139,92,246,0.15) 0%, transparent 60%)',
      }} />

      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, #3B82F6, transparent)',
      }} />

      <div className="relative z-10 max-w-3xl mx-auto">
        <GlassPanel
          cornerRadius={28}
          blurAmount={20}
          className="w-full"
          style={{ width: '100%' }}
        >
          <div className="py-16 px-10 text-center">
            <span className="section-label">Get Started</span>

            <h2
              className="text-4xl md:text-[56px] font-bold leading-tight mb-6 mt-4"
              style={{ color: '#F8FAFC', textShadow: '0 0 60px rgba(59,130,246,0.3)' }}
            >
              Ready to Fill Your{' '}
              <span style={{
                background: 'linear-gradient(135deg, #3B82F6, #06B6D4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Pipeline?
              </span>
            </h2>

            <p className="text-lg text-[#94A3B8] leading-[1.7] mb-10 max-w-xl mx-auto">
              Let&apos;s map out your GTM system in a 30-minute call. No pitch decks. Just a real
              conversation.
            </p>

            <a
              href="https://calendly.com/book-strategycall-sigflow-wijdan"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow text-lg px-10 py-4 w-full sm:w-auto"
              data-magnetic
              style={{ fontSize: '18px' }}
            >
              Book a Call
            </a>
          </div>
        </GlassPanel>
      </div>

      {/* Bottom border accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(59,130,246,0.4), transparent)',
      }} />
    </section>
  )
}
