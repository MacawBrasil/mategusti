import Image from 'next/image'

import type { Home, Media } from '@/payload-types'
import { RichText } from './richtext'

type AboutProps = {
  about?: Home['about']
}

type AboutImage = NonNullable<Home['about']>['image']

function isPopulatedMedia(media: AboutImage): media is Media & { url: string } {
  return (
    typeof media === 'object' &&
    media !== null &&
    typeof media.url === 'string' &&
    media.url.length > 0
  )
}

export function About({ about }: AboutProps) {
  if (!about) {
    return null
  }

  return (
    <section id="sobre-nos" className="bg-[#FCF8E8] pb-24 pt-40 sm:pt-64">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2 lg:px-12 xl:px-16">
        <div className="max-w-lg">
          {about.title ? (
            <h2 className="text-center text-5xl font-bold leading-none text-[#4C1514] sm:text-start md:text-6xl lg:text-7xl">
              {about.title}
            </h2>
          ) : null}

          <Image
            src="/onda-sobre.svg"
            alt=""
            width={476}
            height={11}
            className="mt-2 h-auto w-full max-w-119  sm:translate-x-10 "
          />

          {about.description ? (
            <RichText
              data={about.description}
              className="mt-10 space-y-5 text-sm leading-relaxed text-[#4C1514] max-w-129.5"
            />
          ) : null}
        </div>

        {isPopulatedMedia(about.image) ? (
          <Image
            src={about.image.url}
            alt={about.image.alt}
            width={about.image.width ?? 630}
            height={about.image.height ?? 400}
            className="h-auto w-full"
          />
        ) : null}
      </div>
    </section>
  )
}
