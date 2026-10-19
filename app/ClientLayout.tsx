'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import CustomCursor from '@/components/ui/CustomCursor'

const ChatWidget  = dynamic(() => import('@/components/ui/ChatWidget'),  { ssr: false })
const MobileCTA   = dynamic(() => import('@/components/ui/MobileCTA'),   { ssr: false })

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  // The Sanity Studio is a full app of its own: no site chrome or smooth scrolling there
  const isStudio = usePathname()?.startsWith('/studio') ?? false

  useEffect(() => {
    if (isStudio) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const initScroll = async () => {
      const [LenisModule, { gsap }, { ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])

      gsap.registerPlugin(ScrollTrigger)

      const lenis = new LenisModule.default({
        lerp: prefersReducedMotion ? 1 : 0.1,
        smoothWheel: !prefersReducedMotion,
      })

      // Wire Lenis → ScrollTrigger on every frame
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
      })
      gsap.ticker.lagSmoothing(0)

      // Keep ScrollTrigger in sync on every Lenis scroll event
      lenis.on('scroll', ScrollTrigger.update)

      return lenis
    }

    let cancelled = false
    let lenisInstance: import('lenis').default | null = null
    initScroll().then((l) => {
      lenisInstance = l ?? null
      if (cancelled) lenisInstance?.destroy()
    })

    return () => {
      cancelled = true
      lenisInstance?.destroy()
    }
  }, [isStudio])

  if (isStudio) return <>{children}</>

  return (
    <>
      <CustomCursor />
      <ChatWidget />
      <MobileCTA />
      {children}
    </>
  )
}
