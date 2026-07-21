'use client'

import Image from 'next/image'
import { Accordion } from 'radix-ui'
import { ChevronDown } from 'lucide-react'

import type { Home, Media } from '@/payload-types'
import { RichText } from './richtext'

type ProductsProps = {
  products?: Home['products']
}

type ProductItem = NonNullable<NonNullable<Home['products']>['items']>[number]
type ProductMediaBlock = NonNullable<ProductItem['media']>[number]
type MediaUpload = string | Media | null | undefined

function isPopulatedMedia(media: MediaUpload): media is Media & { url: string } {
  return (
    typeof media === 'object' &&
    media !== null &&
    typeof media.url === 'string' &&
    media.url.length > 0
  )
}

function renderProductMedia(block: ProductMediaBlock | undefined) {
  if (!block) {
    return null
  }

  if (block.blockType === 'image' && isPopulatedMedia(block.image)) {
    return (
      <Image
        src={block.image.url}
        alt={block.image.alt}
        width={block.image.width ?? 630}
        height={block.image.height ?? 400}
        className="h-auto w-full rounded-xl"
      />
    )
  }

  if (block.blockType === 'video' && isPopulatedMedia(block.video)) {
    const poster = isPopulatedMedia(block.poster) ? block.poster.url : undefined

    return (
      <video
        src={block.video.url}
        poster={poster}
        controls
        className="aspect-video w-full rounded-xl object-cover"
        aria-label={block.video.alt}
      />
    )
  }

  if (block.blockType === 'youtube' && (block.embedUrl || block.url)) {
    return (
      <div className="relative overflow-hidden rounded-xl">
        <iframe
          src={block.embedUrl ?? block.url}
          title={block.blockName ?? 'Vídeo do produto'}
          className="aspect-video w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    )
  }

  return null
}

export function Products({ products }: ProductsProps) {
  const items = products?.items?.filter((item) => item.title) ?? []

  if (!products || !items.length) {
    return null
  }

  return (
    <section
      id="produtos"
      className="relative overflow-hidden bg-[#4C1514] bg-[url('/fundo-produtos.png')] bg-cover bg-center py-20"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-[30px] w-[570px] -translate-x-1/2 sm:-translate-x-0 bg-[url('/xadrez-verde.png')] bg-cover bg-center" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[30px] w-[570px] -translate-x-1/2 sm:-translate-x-0 bg-[url('/xadrezvermelho.png')] bg-cover bg-center" />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-start gap-20 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 xl:px-16">
        <div className="flex flex-col items-center text-center">
          {products.title ? (
            <div>
              <h2 className="text-5xl font-bold leading-none text-[#4C1514] md:text-6xl">
                {products.title}
              </h2>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="196"
                height="11"
                viewBox="0 0 196 11"
                fill="none"
                className="mt-1 h-auto"
              >
                <path
                  d="M1 10C11.7754 10 11.7709 1 22.5463 1C33.3217 1 33.3172 10 44.0925 10C54.8679 10 54.8634 1 65.6388 1C76.4142 1 76.4097 10 87.1806 10C97.9515 10 97.9515 1 108.727 1C119.502 1 119.498 10 130.273 10C141.049 10 141.044 1 151.819 1C162.595 1 162.595 10 173.366 10C184.137 10 184.141 1 194.912 1"
                  stroke="#4C1514"
                  stroke-width="2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                />
              </svg>
            </div>
          ) : null}

          {isPopulatedMedia(products.image) ? (
            <Image
              src={products.image.url}
              alt={products.image.alt}
              width={products.image.width ?? 519}
              height={products.image.height ?? 539}
              className="mt-8 h-auto max-w-full"
            />
          ) : null}
        </div>

        <Accordion.Root
          type="single"
          collapsible
          defaultValue={items[0]?.id ?? 'product-0'}
          className="flex flex-col gap-4"
        >
          {items.map((item, index) => {
            const value = item.id ?? `product-${index}`
            const mediaBlock = item.media?.[0]

            return (
              <Accordion.Item
                value={value}
                key={value}
                className="overflow-hidden rounded-[28px] bg-[#FCF8E8] text-[#4C1514]"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="group cursor-pointer  flex min-h-15 w-full items-center justify-between gap-4 px-6 py-3 text-left">
                    <span className="flex min-w-0 items-center gap-4">
                      {isPopulatedMedia(item.icon) ? (
                        <Image
                          src={item.icon.url}
                          alt={item.icon.alt}
                          width={item.icon.width ?? 35}
                          height={item.icon.height ?? 35}
                          className="size-8 shrink-0 object-contain"
                        />
                      ) : null}
                      <span className="truncate font-title text-xl font-bold">{item.title}</span>
                    </span>
                    <ChevronDown className="size-5 shrink-0 transition-transform group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                </Accordion.Header>

                <Accordion.Content className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden px-6 pb-6">
                  <div className="grid gap-5">
                    <div className="grid gap-4 md:grid-cols-[90px_1fr]">
                      {isPopulatedMedia(item.productImage) ? (
                        <Image
                          src={item.productImage.url}
                          alt={item.productImage.alt}
                          width={item.productImage.width ?? 90}
                          height={item.productImage.height ?? 143}
                          className="h-auto w-[90px]"
                        />
                      ) : null}

                      {item.description ? (
                        <RichText
                          data={item.description}
                          className="text-sm leading-relaxed text-[#4C1514]"
                        />
                      ) : null}
                    </div>

                    {renderProductMedia(mediaBlock)}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            )
          })}
        </Accordion.Root>
      </div>
    </section>
  )
}
