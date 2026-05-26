'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type CardPadding = 'none' | 'sm' | 'md' | 'lg'

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  image?: string
  imageAlt?: string
  padding?: CardPadding
  hoverable?: boolean
  glass?: boolean
  children?: ReactNode
}

const paddingStyles: Record<CardPadding, string> = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-8',
}

function Card({
  image,
  imageAlt = '',
  padding = 'md',
  hoverable = false,
  glass = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <motion.div
      whileHover={hoverable ? { y: -4 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn(
        'rounded-xl border border-navy-200 bg-white overflow-hidden',
        glass && 'glass',
        hoverable && 'cursor-pointer',
        className,
      )}
      {...props}
    >
      {image && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={image}
            alt={imageAlt}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <div className={paddingStyles[padding]}>{children}</div>
    </motion.div>
  )
}

export { Card }
export type { CardProps, CardPadding }
