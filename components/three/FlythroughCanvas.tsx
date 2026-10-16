'use client'

import { Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import NodeNetwork from './NodeNetwork'
import { heroScrollProgress } from '@/lib/scrollState'

export default function FlythroughCanvas() {
  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      ScrollTrigger.create({
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        onUpdate: (self) => { heroScrollProgress.value = self.progress },
      })
    }
    init()
  }, [])

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 62 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      style={{ background: 'transparent' }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener('webglcontextlost', (e) => e.preventDefault(), false)
      }}
    >
      <Suspense fallback={null}>
        <NodeNetwork />
      </Suspense>
    </Canvas>
  )
}
