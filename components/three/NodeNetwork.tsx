'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { heroScrollProgress } from '@/lib/scrollState'

const NODE_COUNT = 90
const CORRIDOR_LENGTH = 55
const SPREAD = 9

export default function NodeNetwork() {
  const { camera } = useThree()

  const nodes = useMemo(() => {
    const rng = (seed: number) => {
      let x = Math.sin(seed) * 43758.5453
      return x - Math.floor(x)
    }
    return Array.from({ length: NODE_COUNT }, (_, i) => ({
      x: (rng(i * 3.1) - 0.5) * SPREAD * 2,
      y: (rng(i * 7.3) - 0.5) * SPREAD * 2,
      z: rng(i * 2.7) * -CORRIDOR_LENGTH + 4,
    }))
  }, [])

  const { nodePositions, linePositions, lineCount } = useMemo(() => {
    const np = new Float32Array(NODE_COUNT * 3)
    nodes.forEach((n, i) => {
      np[i * 3] = n.x
      np[i * 3 + 1] = n.y
      np[i * 3 + 2] = n.z
    })

    const segs: number[] = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x
        const dy = nodes[i].y - nodes[j].y
        const dz = nodes[i].z - nodes[j].z
        if (dx * dx + dy * dy + dz * dz < 110) {
          segs.push(nodes[i].x, nodes[i].y, nodes[i].z)
          segs.push(nodes[j].x, nodes[j].y, nodes[j].z)
        }
      }
    }

    return {
      nodePositions: np,
      linePositions: new Float32Array(segs),
      lineCount: segs.length / 3,
    }
  }, [nodes])

  useFrame(({ clock }) => {
    const p = heroScrollProgress.value
    const t = clock.getElapsedTime()

    const targetZ = 7 - p * 52
    const targetX = Math.sin(t * 0.25) * 1.2 + p * 2.5
    const targetY = Math.cos(t * 0.18) * 0.6 + p * -0.5

    ;(camera as THREE.PerspectiveCamera).position.z +=
      (targetZ - camera.position.z) * 0.04
    ;(camera as THREE.PerspectiveCamera).position.x +=
      (targetX - camera.position.x) * 0.04
    ;(camera as THREE.PerspectiveCamera).position.y +=
      (targetY - camera.position.y) * 0.04

    camera.lookAt(
      camera.position.x * 0.1,
      camera.position.y * 0.1,
      camera.position.z - 10
    )
  })

  return (
    <>
      {/* Nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#06B6D4"
          size={0.07}
          sizeAttenuation
          transparent
          opacity={0.95}
        />
      </points>

      {/* Connection lines */}
      {lineCount > 0 && (
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[linePositions, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#3B82F6" transparent opacity={0.2} />
        </lineSegments>
      )}

      {/* Ambient glow spheres at some nodes */}
      {nodes.slice(0, 12).map((n, i) => (
        <mesh key={i} position={[n.x, n.y, n.z]}>
          <sphereGeometry args={[0.12, 6, 6]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? '#3B82F6' : '#06B6D4'}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </>
  )
}
