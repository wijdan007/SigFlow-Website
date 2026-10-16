'use client'

import { useEffect, useState } from 'react'
import { Calendar } from 'lucide-react'

export default function MobileCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9998] md:hidden transition-transform duration-300"
      style={{ transform: visible ? 'translateY(0)' : 'translateY(100%' }}
    >
      <div
        className="px-4 py-3"
        style={{
          background: 'rgba(8,10,18,0.97)',
          borderTop: '1px solid rgba(59,130,246,0.2)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <a
          href="https://calendly.com/book-strategycall-sigflow-wijdan"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm text-white"
          style={{
            background: 'linear-gradient(135deg, #2563EB, #0891B2)',
            boxShadow: '0 4px 20px rgba(59,130,246,0.35)',
            textDecoration: 'none',
          }}
        >
          <Calendar size={16} />
          Book a Free Strategy Call
        </a>
        <p className="text-center text-[10px] mt-1.5" style={{ color: '#334155' }}>
          We respond within 24 hours ⚡
        </p>
      </div>
    </div>
  )
}
