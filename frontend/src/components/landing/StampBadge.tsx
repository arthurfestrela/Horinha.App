import type { ReactNode } from 'react'

type StampBadgeProps = {
  children: ReactNode
  className?: string
}

export function StampBadge({ children, className = '' }: StampBadgeProps) {
  return (
    <span className={`stamp px-4 py-1.5 text-leather-dark text-lg ${className}`}>{children}</span>
  )
}
