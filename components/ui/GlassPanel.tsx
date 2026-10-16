'use client'

import type { CSSProperties, ReactNode } from 'react'

interface GlassPanelProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  cornerRadius?: number
  blurAmount?: number
  onClick?: () => void
  padding?: string
}

export default function GlassPanel({
  children,
  className = '',
  style,
  cornerRadius = 20,
  blurAmount = 12,
  padding,
  onClick,
}: GlassPanelProps) {
  return (
    <div
      className={className}
      style={{
        borderRadius: `${cornerRadius}px`,
        backdropFilter: `blur(${blurAmount}px) saturate(160%)`,
        WebkitBackdropFilter: `blur(${blurAmount}px) saturate(160%)`,
        background: 'rgba(255, 255, 255, 0.04)',
        border: '1px solid rgba(255, 255, 255, 0.10)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
        padding: padding ?? undefined,
        cursor: onClick ? 'pointer' : undefined,
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
