import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt    = 'Sigflow GTM – Signal-Driven Go-To-Market'
export const size   = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #080C14 0%, #0D1626 50%, #091220 100%)',
          padding: '80px 90px',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Background glow */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(ellipse 60% 60% at 70% 40%, rgba(59,130,246,0.18) 0%, transparent 65%)',
        }} />

        {/* Logo mark */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40,
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: 'linear-gradient(135deg, #2563EB, #0891B2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(59,130,246,0.4)',
          }}>
            <svg width="30" height="30" viewBox="0 0 100 100" fill="none">
              <circle cx="24" cy="68" r="7" fill="white"/>
              <circle cx="50" cy="50" r="5.5" fill="rgba(255,255,255,0.7)"/>
              <circle cx="76" cy="32" r="7" fill="white"/>
              <path d="M24 68 Q37 59 50 50 Q63 41 76 32" stroke="white" strokeWidth="4" strokeLinecap="round" fill="none"/>
              <path d="M76 32 L69 27 M76 32 L71 39" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </div>
          <span style={{ fontSize: 28, fontWeight: 700, color: 'white' }}>
            Sigflow <span style={{ color: '#3B82F6' }}>GTM</span>
          </span>
        </div>

        {/* Headline */}
        <div style={{
          fontSize: 68, fontWeight: 800, lineHeight: 1.05,
          color: '#F8FAFC', marginBottom: 28, maxWidth: 800,
        }}>
          Signal-Driven{' '}
          <span style={{
            background: 'linear-gradient(135deg, #3B82F6, #06B6D4)',
            WebkitBackgroundClip: 'text',
            color: '#3B82F6',
          }}>
            Go-To-Market.
          </span>
        </div>

        {/* Sub */}
        <div style={{
          fontSize: 26, color: '#94A3B8', lineHeight: 1.5,
          maxWidth: 720, marginBottom: 52,
        }}>
          We build outbound systems using 40+ buying signals to fill your pipeline with qualified meetings.
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 48 }}>
          {[
            { value: '40+', label: 'Buying Signals' },
            { value: '3×',  label: 'Pipeline Growth' },
            { value: '20-30d', label: 'To First Results' },
          ].map((s) => (
            <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 36, fontWeight: 800, color: '#3B82F6' }}>{s.value}</span>
              <span style={{ fontSize: 16, color: '#64748B' }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* URL badge */}
        <div style={{
          position: 'absolute', bottom: 48, right: 90,
          fontSize: 18, color: '#334155',
        }}>
          sigflowgtm.com
        </div>
      </div>
    ),
    { ...size }
  )
}
