import Image from 'next/image'

import type { Home, Media } from '@/payload-types'

type WhereToFindProps = {
  whereToFind?: Home['whereToFind']
}

type WhereToFindImage = NonNullable<NonNullable<Home['whereToFind']>['items']>[number]['image']

function isPopulatedMedia(media: WhereToFindImage): media is Media & { url: string } {
  return (
    typeof media === 'object' &&
    media !== null &&
    typeof media.url === 'string' &&
    media.url.length > 0
  )
}

export function WhereToFind({ whereToFind }: WhereToFindProps) {
  const items =
    whereToFind?.items?.reduce<{ id?: string | null; image: Media & { url: string } }[]>(
      (images, item) => {
        if (isPopulatedMedia(item.image)) {
          images.push({
            id: item.id,
            image: item.image,
          })
        }

        return images
      },
      [],
    ) ?? []

  if (!whereToFind || !items.length) {
    return null
  }

  return (
    <section id="onde-encontrar" className="relative bg-[#4C1514] py-24 text-[#FCF8E8]">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-16">
        <div className="text-center">
          {whereToFind.title ? (
            <h2 className="text-5xl font-bold leading-none md:text-6xl">{whereToFind.title}</h2>
          ) : null}

          <div>
            <Image
              src="/onda-encontrar.svg"
              alt=""
              width={476}
              height={11}
              className="mx-auto mt-2 h-auto w-full max-w-[21rem] sm:max-w-[476px] sm:-translate-x-16"
            />
          </div>
        </div>

        <div className="mx-auto mt-14 grid max-w-7xl grid-cols-2 items-center gap-x-8 gap-y-14 md:gap-16 lg:grid-cols-4 lg:gap-20">
          {items.map((item) => (
            <div key={`${item.id ?? item.image.id}`} className="flex items-center justify-center">
              <Image
                src={item.image.url}
                alt={item.image.alt}
                width={item.image.width ?? 180}
                height={item.image.height ?? 80}
                className="h-auto max-h-14 w-auto max-w-[9rem] object-contain sm:max-w-44 md:max-h-16"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-8 z-10 left-0 right-0 h-[62px] bg-[url('/xadrez.png')] bg-repeat-x" />
    </section>
  )
}
