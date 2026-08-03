import Image from 'next/image'
import type { CSSProperties } from 'react'

import type { Home, Media, Setting } from '@/payload-types'
import { Navbar } from '@/components/navbar'
import { ButtonLink } from './button-link'
import { RichText } from './richtext'

type HeroProps = {
  logo: Setting['logo']
  hero: Home['hero']
}

type HeroGalleryImage = NonNullable<Home['hero']['gallery']>[number]['image']
type PopulatedGalleryItem = {
  id?: string | null
  image: Media & { url: string }
}

function isPopulatedMedia(media: HeroGalleryImage): media is Media & { url: string } {
  return (
    typeof media === 'object' &&
    media !== null &&
    typeof media.url === 'string' &&
    media.url.length > 0
  )
}

const galleryOffsets = [0, -48, 38, -18, 32, -36, 14, -28]

export function Hero({ hero, logo }: HeroProps) {
  const galleryImages =
    hero.gallery?.reduce<PopulatedGalleryItem[]>((images, item) => {
      if (isPopulatedMedia(item.image)) {
        images.push({
          id: item.id,
          image: item.image,
        })
      }

      return images
    }, []) ?? []

  return (
    <section className="relative isolate h-[680px] overflow-visible bg-[#531E17] sm:h-[760px] md:h-[820px] lg:h-182.5">
      <Navbar logo={logo} />

      <Image
        src="/casa-hero.svg"
        alt=""
        width={1631}
        height={768}
        className="pointer-events-none absolute left-1/2 bottom-10 z-0 h-auto w-[980px] -translate-x-1/2 opacity-50 sm:w-[1200px] lg:bottom-0 lg:w-[1631px] lg:opacity-60"
      />

      <div className="relative z-10 mx-auto mt-20 flex max-w-5xl flex-col items-center gap-7 px-6 text-center sm:mt-28 lg:mt-36 lg:gap-8">
        <RichText
          data={hero.title}
          className="space-y-2.5 text-lg text-[#FCF8E8] sm:text-xl md:text-2xl [&_strong]:block [&_strong]:text-5xl [&_strong]:leading-[0.9] sm:[&_strong]:text-6xl md:[&_strong]:text-7xl lg:[&_strong]:text-8xl"
        />

        <ButtonLink
          title={hero.ctaHero.title}
          href={hero.ctaHero.href}
          variant="hollow"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="12"
              viewBox="0 0 40 12"
              fill="none"
              className="transition-all group-hover:[&_path]:fill-white"
            >
              <path
                d="M39.7086 5.38264L33.8521 0.256595C33.4613 -0.0855315 32.8267 -0.0855315 32.4343 0.256595C32.0435 0.598721 32.0435 1.15431 32.4343 1.49644L36.5758 5.12239H34.7789C31.0065 5.12239 29.046 6.55084 27.3159 7.81261C25.636 9.03783 24.1848 10.0964 21.1355 10.0964C18.0861 10.0964 16.6366 9.03783 14.955 7.81261C13.2266 6.5523 11.2661 5.12239 7.49199 5.12239C4.03353 5.12239 2.14816 6.28035 0.36466 7.56991C-0.0628459 7.8784 -0.122964 8.43107 0.229395 8.80536C0.581753 9.17819 1.21299 9.23229 1.6405 8.92233C3.24365 7.7629 4.69149 6.87688 7.49199 6.87688C10.5396 6.87688 11.9908 7.93543 13.6725 9.16065C15.4009 10.421 17.3614 11.8509 21.1355 11.8509C24.9095 11.8509 26.8684 10.4224 28.5984 9.16065C30.2784 7.93543 31.7296 6.87688 34.7789 6.87688H36.5841L32.4427 10.5028C32.0519 10.845 32.0519 11.4005 32.4427 11.7427C32.638 11.9137 32.8952 12 33.1507 12C33.4062 12 33.6634 11.9137 33.8588 11.7427L39.7069 6.62248C40.0977 6.28035 40.0977 5.72476 39.7069 5.38264H39.7086Z"
                fill="#21AA50"
              />
            </svg>
          }
          newTab={hero.ctaHero.newTab}
          className="group max-w-[calc(100vw-3rem)]"
        />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-[62px] translate-y-1/2">
        <Image src="/xadrez.png" alt="" fill sizes="100vw" className="object-cover" priority />
      </div>

      {galleryImages.length ? (
        <div className="hero-marquee" aria-label="Galeria de imagens">
          <div className="hero-marquee__track">
            {[0, 1].map((groupIndex) => (
              <div className="hero-marquee__group" aria-hidden={groupIndex === 1} key={groupIndex}>
                {galleryImages.map((item, index) => (
                  <div
                    className="hero-marquee__item"
                    key={`${groupIndex}-${item.id ?? item.image.id}`}
                    style={
                      {
                        '--hero-marquee-offset': `${galleryOffsets[index % galleryOffsets.length]}px`,
                      } as CSSProperties
                    }
                  >
                    <Image
                      alt={item.image.alt}
                      height={item.image.height ?? 400}
                      src={item.image.url}
                      width={item.image.width ?? 600}
                      priority
                      quality={100}
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  )
}
