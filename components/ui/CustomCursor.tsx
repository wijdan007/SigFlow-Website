'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef    = useRef<HTMLDivElement>(null)
  const ringRef   = useRef<HTMLDivElement>(null)
  const t1Ref     = useRef<HTMLDivElement>(null)
  const t2Ref     = useRef<HTMLDivElement>(null)
  const t3Ref     = useRef<HTMLDivElement>(null)
  const rafRef    = useRef<number>(0)

  const mouse  = useRef({ x: -300, y: -300 })
  const ring   = useRef({ x: -300, y: -300 })
  const tr1    = useRef({ x: -300, y: -300 })
  const tr2    = useRef({ x: -300, y: -300 })
  const tr3    = useRef({ x: -300, y: -300 })

  const hovered = useRef(false)
  const clicking = useRef(false)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const dot  = dotRef.current
    const ring = ringRef.current
    const t1   = t1Ref.current
    const t2   = t2Ref.current
    const t3   = t3Ref.current
    if (!dot || !ring || !t1 || !t2 || !t3) return

    document.documentElement.style.cursor = 'none'

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    const isInteractive = (el: Element) =>
      el.closest('a, button, [role="button"], input, label, select, textarea') !== null

    const onMouseOver = (e: MouseEvent) => {
      if (!isInteractive(e.target as Element)) return
      hovered.current = true
      ring.style.width  = '52px'
      ring.style.height = '52px'
      ring.style.borderColor = 'rgba(59,130,246,0.9)'
      ring.style.boxShadow = '0 0 20px rgba(59,130,246,0.5), 0 0 6px rgba(59,130,246,0.3), inset 0 0 12px rgba(59,130,246,0.08)'
      dot.style.transform = dot.style.transform + ' scale(1.6)'
      dot.style.boxShadow = '0 0 16px rgba(59,130,246,1), 0 0 32px rgba(6,182,212,0.6)'
    }

    const onMouseOut = (e: MouseEvent) => {
      if (!isInteractive(e.target as Element)) return
      hovered.current = false
      ring.style.width  = '36px'
      ring.style.height = '36px'
      ring.style.borderColor = 'rgba(59,130,246,0.5)'
      ring.style.boxShadow = '0 0 10px rgba(59,130,246,0.2), 0 0 3px rgba(59,130,246,0.15)'
      dot.style.boxShadow = '0 0 10px rgba(59,130,246,0.8), 0 0 20px rgba(6,182,212,0.4)'
    }

    const onMouseDown = () => {
      clicking.current = true
      ring.style.transform = ring.style.transform
      ring.style.width  = '28px'
      ring.style.height = '28px'
    }

    const onMouseUp = () => {
      clicking.current = false
      ring.style.width  = hovered.current ? '52px' : '36px'
      ring.style.height = hovered.current ? '52px' : '36px'
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout',  onMouseOut)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup',   onMouseUp)

    // Magnetic pull on [data-magnetic] elements
    const magneticEls = Array.from(document.querySelectorAll<HTMLElement>('[data-magnetic]'))
    const cleanups: Array<() => void> = []
    for (const el of magneticEls) {
      let animId = 0; let tx = 0, ty = 0
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect()
        tx = (e.clientX - (r.left + r.width  / 2)) * 0.28
        ty = (e.clientY - (r.top  + r.height / 2)) * 0.28
        el.style.transform = `translate(${tx}px,${ty}px)`
        el.style.transition = 'transform 0.15s ease'
      }
      const onLeave = () => {
        cancelAnimationFrame(animId)
        const snap = () => {
          tx *= 0.82; ty *= 0.82
          el.style.transform = `translate(${tx}px,${ty}px)`
          el.style.transition = 'none'
          if (Math.abs(tx) > 0.05 || Math.abs(ty) > 0.05) animId = requestAnimationFrame(snap)
          else { el.style.transform = ''; el.style.transition = '' }
        }
        animId = requestAnimationFrame(snap)
      }
      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)
      cleanups.push(() => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
        cancelAnimationFrame(animId)
        el.style.transform = ''; el.style.transition = ''
      })
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const animate = () => {
      const mx = mouse.current.x, my = mouse.current.y

      // Ring lags behind
      ;(ringRef.current as any).x = lerp((ringRef.current as any).x ?? mx, mx, 0.11)
      ;(ringRef.current as any).y = lerp((ringRef.current as any).y ?? my, my, 0.11)

      // Trail lags even more
      tr1.current.x = lerp(tr1.current.x, mx, 0.07)
      tr1.current.y = lerp(tr1.current.y, my, 0.07)
      tr2.current.x = lerp(tr2.current.x, mx, 0.05)
      tr2.current.y = lerp(tr2.current.y, my, 0.05)
      tr3.current.x = lerp(tr3.current.x, mx, 0.035)
      tr3.current.y = lerp(tr3.current.y, my, 0.035)

      const rw = parseFloat(ring.style.width)  || 36
      const rh = parseFloat(ring.style.height) || 36

      dot.style.transform  = `translate(${mx - 4}px,${my - 4}px)`
      ring.style.transform = `translate(${(ringRef.current as any)?.x ?? mx - rw/2}px,${(ringRef.current as any)?.y ?? my - rh/2}px) translate(-50%,-50%)`

      t1.style.transform = `translate(${tr1.current.x - 3}px,${tr1.current.y - 3}px)`
      t2.style.transform = `translate(${tr2.current.x - 2.5}px,${tr2.current.y - 2.5}px)`
      t3.style.transform = `translate(${tr3.current.x - 2}px,${tr3.current.y - 2}px)`

      rafRef.current = requestAnimationFrame(animate)
    }

    // Seed ring position refs
    ;(ringRef.current as any).x = -300
    ;(ringRef.current as any).y = -300
    animate()

    return () => {
      document.documentElement.style.cursor = ''
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout',  onMouseOut)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup',   onMouseUp)
      cancelAnimationFrame(rafRef.current)
      cleanups.forEach(fn => fn())
    }
  }, [])

  const base: React.CSSProperties = {
    position: 'fixed', top: 0, left: 0,
    pointerEvents: 'none', zIndex: 99999,
    willChange: 'transform',
  }

  return (
    <>
      {/* Trail dots */}
      <div ref={t3Ref} style={{ ...base, zIndex: 99995, width: 5, height: 5, borderRadius: '50%', background: 'rgba(6,182,212,0.25)', filter: 'blur(1px)' }} />
      <div ref={t2Ref} style={{ ...base, zIndex: 99996, width: 6, height: 6, borderRadius: '50%', background: 'rgba(59,130,246,0.35)', filter: 'blur(0.5px)' }} />
      <div ref={t1Ref} style={{ ...base, zIndex: 99997, width: 7, height: 7, borderRadius: '50%', background: 'rgba(59,130,246,0.55)' }} />

      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          ...base,
          zIndex: 99998,
          width: 36, height: 36,
          borderRadius: '50%',
          border: '1.5px solid rgba(59,130,246,0.5)',
          boxShadow: '0 0 10px rgba(59,130,246,0.2), 0 0 3px rgba(59,130,246,0.15)',
          transition: 'width 0.22s ease, height 0.22s ease, border-color 0.22s, box-shadow 0.22s',
          background: 'transparent',
        }}
      />

      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          ...base,
          zIndex: 99999,
          width: 8, height: 8,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #3B82F6, #06B6D4)',
          boxShadow: '0 0 10px rgba(59,130,246,0.8), 0 0 20px rgba(6,182,212,0.4)',
          transition: 'box-shadow 0.2s',
        }}
      />
    </>
  )
}
