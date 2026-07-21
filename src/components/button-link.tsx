import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import type { VariantProps } from 'class-variance-authority'
import type { ReactNode } from 'react'

interface ButtonLinkProps extends VariantProps<typeof buttonVariants> {
  title?: string | null
  href?: string | null
  type?: ('internal' | 'external' | 'whatsapp') | null
  newTab?: boolean | null
  className?: string
  icon?: ReactNode
}

function normalizeWhatsAppHref(value: string) {
  const digits = value.replace(/\D/g, '')

  return digits ? `https://wa.me/${digits}` : null
}

export function ButtonLink({
  title,
  href,
  type = 'internal',
  newTab,
  variant,
  className,
  icon,
}: ButtonLinkProps) {
  if (!title || !href) return null
  const resolvedHref = type === 'whatsapp' ? normalizeWhatsAppHref(href) : href

  if (!resolvedHref) return null

  const content = (
    <>
      {title}
      {icon}
    </>
  )

  if (type === 'external') {
    return (
      <Button asChild variant={variant} className={className}>
        <a href={resolvedHref} target={newTab ? '_blank' : undefined} rel="noopener noreferrer">
          {content}
        </a>
      </Button>
    )
  }

  if (type === 'whatsapp') {
    return (
      <Button asChild variant={variant} className={className}>
        <a href={resolvedHref} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      </Button>
    )
  }

  return (
    <Button asChild variant={variant} className={className}>
      <Link href={resolvedHref} target={newTab ? '_blank' : undefined}>
        {content}
      </Link>
    </Button>
  )
}
