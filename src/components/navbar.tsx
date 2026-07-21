'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

import type { Media, Setting } from '@/payload-types'

type NavbarProps = {
  logo: Setting['logo']
}

function isPopulatedLogo(logo: Setting['logo']): logo is Media & { url: string } {
  return (
    typeof logo === 'object' && logo !== null && typeof logo.url === 'string' && logo.url.length > 0
  )
}

const menuItems = [
  { href: '#inicio', label: 'Início' },
  { href: '#sobre-nos', label: 'Sobre nós' },
  { href: '#produtos', label: 'Produtos' },
  { href: '#onde-encontrar', label: 'Onde encontrar' },
  { href: '#contato', label: 'Contato' },
]

export function Navbar({ logo }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="relative z-50 mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-12 xl:px-16">
      <Link href="#inicio" aria-label="Ir para o início" onClick={() => setIsOpen(false)}>
        {isPopulatedLogo(logo) ? (
          <Image
            alt={logo.alt}
            height={logo.height ?? 48}
            priority
            src={logo.url}
            width={logo.width ?? 160}
          />
        ) : null}
      </Link>

      <ul className="hidden items-center gap-10 lg:flex">
        {menuItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group relative [font-variant:small-caps] inline-flex flex-col items-center text-sm uppercase font-bold text-[#FCF7E8] transition-colors tracking-[3.2px]"
            >
              <span className="absolute -top-2 h-[3px] w-[55px] opacity-0 transition-opacity group-hover:opacity-100">
                <span className="block h-full w-1/3 bg-[#21AA50]" />
                <span className="absolute left-1/3 top-0 block h-full w-1/3 bg-[#F1F2F2]" />
                <span className="absolute left-2/3 top-0 block h-full w-1/3 bg-[#ED1C24]" />
              </span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="inline-flex size-11 items-center justify-center rounded-full border border-[#FCF7E8]/40 text-[#FCF7E8] transition-colors hover:border-[#21AA50] hover:text-[#21AA50] lg:hidden"
        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 animate-mobile-menu-in bg-[#531E17] px-6 py-6 lg:hidden">
          <div className="flex items-center justify-between">
            <Link href="#inicio" aria-label="Ir para o início" onClick={() => setIsOpen(false)}>
              {isPopulatedLogo(logo) ? (
                <Image
                  alt={logo.alt}
                  height={logo.height ?? 48}
                  priority
                  src={logo.url}
                  width={logo.width ?? 180}
                />
              ) : null}
            </Link>

            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full border border-[#FCF7E8]/50 text-[#FCF7E8]"
              aria-label="Fechar menu"
              onClick={() => setIsOpen(false)}
            >
              <X className="size-5" />
            </button>
          </div>

          <ul className="mt-20 grid gap-9">
            {menuItems.map((item) => (
              <li key={item.href} className="flex justify-center">
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="group relative inline-flex w-fit flex-col items-center pb-4 text-center text-xl font-bold uppercase tracking-[3.2px] text-[#FCF7E8] [font-variant:small-caps]"
                >
                  {item.label}
                  <span className="absolute bottom-0 h-[3px] w-[55px] opacity-100 transition-opacity">
                    <span className="block h-full w-1/3 bg-[#21AA50]" />
                    <span className="absolute left-1/3 top-0 block h-full w-1/3 bg-[#F1F2F2]" />
                    <span className="absolute left-2/3 top-0 block h-full w-1/3 bg-[#ED1C24]" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </nav>
  )
}
