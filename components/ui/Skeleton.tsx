import { cn } from '@/lib/utils'
import type { CSSProperties } from 'react'

type SkeletonVariant = 'text' | 'circular' | 'rectangular'

interface SkeletonProps {
  variant?: SkeletonVariant
  width?: string | number
  height?: string | number
  className?: string
}

const shimmerKeyframes = `
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.skeleton-shimmer {
  animation: shimmer 1.5s ease-in-out infinite;
  background-size: 200% 100%;
}
`

function Skeleton({
  variant = 'text',
  width,
  height,
  className,
}: SkeletonProps) {
  const style: CSSProperties = {}
  if (width != null) {
    style.width = typeof width === 'number' ? `${width}px` : width
  }
  if (height != null) {
    style.height = typeof height === 'number' ? `${height}px` : height
  }

  if (variant === 'circular' && !width && !height) {
    style.width = '40px'
    style.height = '40px'
  }

  return (
    <>
      <style>{shimmerKeyframes}</style>
      <div
        aria-hidden="true"
        className={cn(
          'skeleton-shimmer bg-gradient-to-r from-navy-100 via-navy-200 to-navy-100',
          variant === 'circular' && 'rounded-full',
          variant === 'text' && 'h-4 w-full rounded',
          variant === 'rectangular' && 'rounded-lg',
          className,
        )}
        style={style}
      />
    </>
  )
}

export { Skeleton }
export type { SkeletonProps, SkeletonVariant }
