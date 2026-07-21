import Image from 'next/image'
import Link from 'next/link'
import { Camera, Clock, Mail, MapPin } from 'lucide-react'

import type { Media, Setting } from '@/payload-types'
import { Button } from './ui/button'
import { Macaw } from './Macaw'

type FooterProps = {
  settings: Setting
}

function isPopulatedMedia(media: Setting['logo']): media is Media & { url: string } {
  return (
    typeof media === 'object' &&
    media !== null &&
    typeof media.url === 'string' &&
    media.url.length > 0
  )
}

const menuItems = [
  { href: '/#inicio', label: 'Início' },
  { href: '/#sobre-nos', label: 'Sobre nós' },
  { href: '/#produtos', label: 'Produtos' },
  { href: '/#onde-encontrar', label: 'Onde encontrar' },
]

export function Footer({ settings }: FooterProps) {
  return (
    <footer id="contato" className="relative overflow-hidden bg-[#FCF8E8] text-[#4C1514] pt-16">
      <Image
        src="/casa-footer.svg"
        alt=""
        width={1631}
        height={768}
        className="pointer-events-none absolute top-4 right-0 z-0 h-auto w-[1631px] -translate-x-0 opacity-60"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-44 px-6 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:px-12 xl:px-16">
        <div className="flex flex-col justify-between gap-12">
          <div>
            <div className="text-2xl font-extrabold leading-tight">
              <p>{settings.phone}</p>
              <p>{settings.whatsapp}</p>
            </div>

            <div className="mt-10 grid gap-4 text-sm">
              <a href={`mailto:${settings.email}`} className="flex items-center gap-3">
                <Mail className="size-4 shrink-0" />
                <span>{settings.email}</span>
              </a>

              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                <span>{settings.address}</span>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="size-4 shrink-0" />
                <span>{settings.openingHours}</span>
              </div>
            </div>

            <nav className="mt-10 grid gap-5 text-[0.65rem] font-extrabold uppercase tracking-[0.28em]">
              {menuItems.map((item) => (
                <Link key={item.href} href={item.href} className="group relative w-fit pb-2">
                  {item.label}
                  <span className="absolute bottom-0 left-0 h-[3px] w-[55px] opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="block h-full w-1/3 bg-[#21AA50]" />
                    <span className="absolute left-1/3 top-0 block h-full w-1/3 bg-[#F1F2F2]" />
                    <span className="absolute left-2/3 top-0 block h-full w-1/3 bg-[#ED1C24]" />
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-end gap-8">
            {isPopulatedMedia(settings.blackLogo) ? (
              <Image
                src={settings.blackLogo.url}
                alt={settings.blackLogo.alt}
                width={settings.blackLogo.width ?? 198}
                height={settings.blackLogo.height ?? 63}
                className="h-auto w-40"
              />
            ) : null}

            <div className="flex items-center gap-4">
              <a
                href={settings.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <g clipPath="url(#clip0_43_723)">
                    <path
                      d="M32 16C32 7.1625 24.8375 0 16 0C7.1625 0 0 7.1625 0 16C0 24.8375 7.1625 32 16 32C16.0938 32 16.1875 32 16.2812 31.9937V19.5438H12.8438V15.5375H16.2812V12.5875C16.2812 9.16875 18.3688 7.30625 21.4188 7.30625C22.8813 7.30625 24.1375 7.4125 24.5 7.4625V11.0375H22.4C20.7437 11.0375 20.4188 11.825 20.4188 12.9812V15.5312H24.3875L23.8687 19.5375H20.4188V31.3813C27.1063 29.4625 32 23.3062 32 16Z"
                      fill="#4C1514"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_43_723">
                      <rect width="32" height="32" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </a>

              <a
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <g clipPath="url(#clip0_43_719)">
                    <path
                      d="M19.0625 16C19.0625 17.6914 17.6914 19.0625 16 19.0625C14.3086 19.0625 12.9375 17.6914 12.9375 16C12.9375 14.3086 14.3086 12.9375 16 12.9375C17.6914 12.9375 19.0625 14.3086 19.0625 16Z"
                      fill="#4C1514"
                    />
                    <path
                      d="M23.1621 10.5815C23.0149 10.1826 22.78 9.82153 22.4749 9.52515C22.1785 9.21997 21.8176 8.98511 21.4185 8.83789C21.0947 8.71216 20.6084 8.5625 19.7126 8.52173C18.7437 8.47754 18.4531 8.46802 16 8.46802C13.5466 8.46802 13.2561 8.47729 12.2874 8.52148C11.3916 8.5625 10.905 8.71216 10.5815 8.83789C10.1824 8.98511 9.82129 9.21997 9.52515 9.52515C9.21997 9.82153 8.98511 10.1824 8.83765 10.5815C8.71191 10.9053 8.56226 11.3918 8.52148 12.2876C8.47729 13.2563 8.46777 13.5469 8.46777 16.0002C8.46777 18.4534 8.47729 18.7439 8.52148 19.7129C8.56226 20.6086 8.71191 21.095 8.83765 21.4187C8.98511 21.8179 9.21973 22.1787 9.5249 22.4751C9.82129 22.7803 10.1821 23.0151 10.5813 23.1624C10.905 23.2883 11.3916 23.438 12.2874 23.4788C13.2561 23.5229 13.5464 23.5322 15.9998 23.5322C18.4534 23.5322 18.7439 23.5229 19.7124 23.4788C20.6082 23.438 21.0947 23.2883 21.4185 23.1624C22.2197 22.8533 22.853 22.22 23.1621 21.4187C23.2878 21.095 23.4375 20.6086 23.4785 19.7129C23.5227 18.7439 23.532 18.4534 23.532 16.0002C23.532 13.5469 23.5227 13.2563 23.4785 12.2876C23.4377 11.3918 23.2881 10.9053 23.1621 10.5815ZM16 20.7178C13.3943 20.7178 11.282 18.6057 11.282 16C11.282 13.3943 13.3943 11.2822 16 11.2822C18.6055 11.2822 20.7178 13.3943 20.7178 16C20.7178 18.6057 18.6055 20.7178 16 20.7178ZM20.9043 12.1982C20.2954 12.1982 19.8018 11.7046 19.8018 11.0957C19.8018 10.4868 20.2954 9.99316 20.9043 9.99316C21.5132 9.99316 22.0068 10.4868 22.0068 11.0957C22.0066 11.7046 21.5132 12.1982 20.9043 12.1982Z"
                      fill="#4C1514"
                    />
                    <path
                      d="M16 0C7.16479 0 0 7.16479 0 16C0 24.8352 7.16479 32 16 32C24.8352 32 32 24.8352 32 16C32 7.16479 24.8352 0 16 0ZM25.1321 19.7878C25.0876 20.7659 24.9321 21.4336 24.7051 22.0181C24.2278 23.2522 23.2522 24.2278 22.0181 24.7051C21.4338 24.9321 20.7659 25.0874 19.7881 25.1321C18.8083 25.1768 18.4954 25.1875 16.0002 25.1875C13.5049 25.1875 13.1921 25.1768 12.2122 25.1321C11.2344 25.0874 10.5664 24.9321 9.98218 24.7051C9.3689 24.4744 8.81372 24.1128 8.35474 23.6453C7.88745 23.1865 7.52588 22.6311 7.29517 22.0181C7.06812 21.4338 6.9126 20.7659 6.86816 19.7881C6.823 18.8081 6.8125 18.4951 6.8125 16C6.8125 13.5049 6.823 13.1919 6.86792 12.2122C6.91235 11.2341 7.06763 10.5664 7.29468 9.98193C7.52539 9.3689 7.88721 8.81348 8.35474 8.35474C8.81348 7.88721 9.3689 7.52563 9.98193 7.29492C10.5664 7.06787 11.2341 6.9126 12.2122 6.86792C13.1919 6.82324 13.5049 6.8125 16 6.8125C18.4951 6.8125 18.8081 6.82324 19.7878 6.86816C20.7659 6.9126 21.4336 7.06787 22.0181 7.29468C22.6311 7.52539 23.1865 7.88721 23.6455 8.35474C24.1128 8.81372 24.4746 9.3689 24.7051 9.98193C24.9324 10.5664 25.0876 11.2341 25.1323 12.2122C25.177 13.1919 25.1875 13.5049 25.1875 16C25.1875 18.4951 25.177 18.8081 25.1321 19.7878Z"
                      fill="#4C1514"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_43_719">
                      <rect width="32" height="32" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-center text-5xl font-semibold leading-none sm:text-start md:text-6xl">
            Entre em Contato
          </h2>
          <Image
            src="/onda-sobre.svg"
            alt=""
            width={430}
            height={11}
            className="mt-2 h-auto w-[430px]"
          />

          <form className="mt-8 grid max-w-xl gap-4">
            <input
              type="text"
              name="name"
              placeholder="Nome*"
              required
              className="h-11 rounded-full border border-[#21AA50] bg-white px-5 text-sm font-semibold outline-none placeholder:text-[#4C1514]"
            />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              className="h-11 rounded-full border border-[#21AA50] bg-white px-5 text-sm font-semibold outline-none placeholder:text-[#4C1514]"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Telefone*"
              required
              className="h-11 rounded-full border border-[#21AA50] bg-white px-5 text-sm font-semibold outline-none placeholder:text-[#4C1514]"
            />
            <textarea
              name="message"
              placeholder="Mensagem"
              rows={5}
              className="resize-none rounded-3xl border border-[#21AA50] bg-white px-5 py-4 text-sm font-semibold outline-none placeholder:text-[#4C1514]"
            />

            <Button
              type="submit"
              variant="solid"
              size="sm"
              className="group ml-auto cursor-pointer group"
            >
              Enviar
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="12"
                viewBox="0 0 40 12"
                fill="none"
                className="transition-all group-hover:[&_path]:fill-[#21AA50] group-active:[&_path]:fill-[#147E35]"
              >
                <path
                  d="M39.7086 5.38264L33.8521 0.256595C33.4613 -0.0855315 32.8267 -0.0855315 32.4343 0.256595C32.0435 0.598721 32.0435 1.15431 32.4343 1.49644L36.5758 5.12239H34.7789C31.0065 5.12239 29.046 6.55084 27.3159 7.81261C25.636 9.03783 24.1848 10.0964 21.1355 10.0964C18.0861 10.0964 16.6366 9.03783 14.955 7.81261C13.2266 6.5523 11.2661 5.12239 7.49199 5.12239C4.03353 5.12239 2.14816 6.28035 0.36466 7.56991C-0.0628459 7.8784 -0.122964 8.43107 0.229395 8.80536C0.581753 9.17819 1.21299 9.23229 1.6405 8.92233C3.24365 7.7629 4.69149 6.87688 7.49199 6.87688C10.5396 6.87688 11.9908 7.93543 13.6725 9.16065C15.4009 10.421 17.3614 11.8509 21.1355 11.8509C24.9095 11.8509 26.8684 10.4224 28.5984 9.16065C30.2784 7.93543 31.7296 6.87688 34.7789 6.87688H36.5841L32.4427 10.5028C32.0519 10.845 32.0519 11.4005 32.4427 11.7427C32.638 11.9137 32.8952 12 33.1507 12C33.4062 12 33.6634 11.9137 33.8588 11.7427L39.7069 6.62248C40.0977 6.28035 40.0977 5.72476 39.7069 5.38264H39.7086Z"
                  fill="white"
                />
              </svg>
            </Button>
          </form>

          <div className="mx-auto mt-10 flex max-w-xl items-center justify-between text-xs">
            <Link href="/politica-de-privacidade">Política de Privacidade</Link>
            <Macaw />
          </div>
        </div>
      </div>
    </footer>
  )
}
