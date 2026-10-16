import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found | Sigflow GTM',
  description: 'The page you were looking for does not exist.',
}

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{
        background: '#0A0A0A',
        backgroundImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(59,130,246,0.1) 0%, transparent 65%)',
      }}
    >
      {/* Glitch number */}
      <div
        className="font-black leading-none select-none mb-6"
        style={{
          fontSize: 'clamp(120px, 20vw, 200px)',
          background: 'linear-gradient(135deg, #1E3A5F, #3B82F6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 0 40px rgba(59,130,246,0.25))',
        }}
      >
        404
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
        This signal doesn't exist.
      </h1>
      <p className="text-[#94A3B8] text-base max-w-sm mb-10">
        The page you're looking for is gone, moved, or never existed. Let's get you back on track.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="btn-glow px-8 py-3 text-sm font-semibold"
          style={{ display: 'inline-block', textDecoration: 'none' }}
        >
          Back to Home
        </Link>
        <a
          href="https://calendly.com/book-strategycall-sigflow-wijdan"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost px-8 py-3 text-sm font-semibold"
          style={{ display: 'inline-block', textDecoration: 'none' }}
        >
          Book a Call
        </a>
      </div>

      {/* Breadcrumb */}
      <nav className="mt-12 text-xs" style={{ color: '#334155' }} aria-label="Breadcrumb">
        <ol style={{ display: 'flex', gap: 8, listStyle: 'none', padding: 0, margin: 0, alignItems: 'center' }}>
          <li><Link href="/" style={{ color: '#3B82F6', textDecoration: 'none' }}>Home</Link></li>
          <li style={{ color: '#1E293B' }}>›</li>
          <li>404</li>
        </ol>
      </nav>
    </main>
  )
}
