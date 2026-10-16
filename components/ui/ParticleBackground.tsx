'use client'

import { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

export default function ParticleBackground() {
  const [engineReady, setEngineReady] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setEngineReady(true))
  }, [])

  if (!engineReady) return null

  return (
    <Particles
      id="hero-particles"
      options={{
        fullScreen: { enable: false },
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'grab' },
            resize: { enable: true },
          },
          modes: {
            grab: { distance: 140, links: { opacity: 0.4 } },
          },
        },
        particles: {
          color: { value: ['#3B82F6', '#06B6D4'] },
          links: {
            color: '#3B82F6',
            distance: 130,
            enable: true,
            opacity: 0.15,
            width: 0.8,
          },
          move: {
            enable: true,
            speed: 0.6,
            direction: 'none',
            outModes: { default: 'bounce' },
          },
          number: { density: { enable: true }, value: 80 },
          opacity: { value: { min: 0.2, max: 0.6 } },
          shape: { type: 'circle' },
          size: { value: { min: 1, max: 2.5 } },
        },
        detectRetina: true,
      }}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  )
}
