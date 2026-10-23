import { ImageResponse } from 'next/og'

// Edge runtime: the Node.js renderer crashes on Windows ("Invalid URL") during `next build`
export const runtime = 'edge'
export const alt = 'Sigflow GTM – Signal-Driven Go-To-Market'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Note: every element with more than one child needs `display: flex`,
// otherwise the image renderer fails and serves an empty (0-byte) image.
export default async function Image() {
  // Bundled with the route, so no filesystem access is needed at the edge
  const [logo, inter400, inter800] = await Promise.all([
    fetch(new URL('../public/logo-mark.png', import.meta.url)).then((r) => r.arrayBuffer()),
    fetch(new URL('../assets/fonts/inter-400.woff', import.meta.url)).then((r) => r.arrayBuffer()),
    fetch(new URL('../assets/fonts/inter-800.woff', import.meta.url)).then((r) => r.arrayBuffer()),
  ])
  const logoSrc = logo as unknown as string // the renderer accepts raw image bytes

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 90px',
          background: '#080C14',
          backgroundImage:
            'radial-gradient(circle at 78% 30%, rgba(59,130,246,0.28) 0%, transparent 45%), radial-gradient(circle at 10% 90%, rgba(6,182,212,0.16) 0%, transparent 40%)',
          fontFamily: 'Inter',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 44 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={64} height={64} style={{ borderRadius: 14 }} alt="" />
          <div style={{ display: 'flex', marginLeft: 18, fontSize: 34, fontWeight: 800 }}>
            <span style={{ color: '#F8FAFC' }}>Sigflow</span>
            <span style={{ color: '#3B82F6', marginLeft: 10 }}>GTM</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 72, fontWeight: 800, lineHeight: 1.05, marginBottom: 28 }}>
          <span style={{ color: '#F8FAFC' }}>Signal-Driven</span>
          <span style={{ color: '#3B82F6' }}>Go-To-Market.</span>
        </div>

        <div style={{ display: 'flex', fontSize: 27, color: '#94A3B8', lineHeight: 1.45, maxWidth: 820 }}>
          Outbound systems built on 40+ buying signals that fill your pipeline with qualified meetings.
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', marginTop: 48 }}>
          {[
            { value: '40+', label: 'Buying signals' },
            { value: '3x', label: 'Pipeline growth' },
            { value: '20-30d', label: 'To first results' },
          ].map((s) => (
            <div key={s.label} style={{ display: 'flex', flexDirection: 'column', marginRight: 64 }}>
              <span style={{ fontSize: 40, fontWeight: 800, color: '#06B6D4' }}>{s.value}</span>
              <span style={{ fontSize: 20, color: '#64748B' }}>{s.label}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', position: 'absolute', bottom: 48, right: 90, fontSize: 22, color: '#64748B' }}>
          sigflowgtm.com
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Inter', data: inter400, weight: 400, style: 'normal' },
        { name: 'Inter', data: inter800, weight: 800, style: 'normal' },
      ],
    }
  )
}
