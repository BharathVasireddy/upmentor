import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  showBeta?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function Logo({ className, showBeta = false, size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  }

  return (
    <Link
      href="/"
      className={cn(
        'inline-flex items-center gap-3 font-display font-bold text-neutral-900 transition-colors hover:text-brand-600',
        sizeClasses[size],
        className
      )}
    >
      UpMentor
      {showBeta && (
        <span className="ml-2 rounded-md bg-brand-100 px-2 py-1 text-xs font-medium text-brand-700">
          Beta
        </span>
      )}
    </Link>
  )
}
