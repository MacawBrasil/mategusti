import { buttonField } from '@/fields/buttonField'
import type { Block, GlobalConfig } from 'payload'

type ProductMediaItem = {
  blockType?: string
  url?: unknown
  [key: string]: unknown
}

const getYouTubeVideoID = (url: string): string | null => {
  let youtubeUrl: URL

  try {
    youtubeUrl = new URL(url)
  } catch {
    return null
  }

  let videoId: string | null = null
  const hostname = youtubeUrl.hostname.replace(/^www\./, '')

  if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
    if (youtubeUrl.pathname.includes('/shorts/')) {
      videoId = youtubeUrl.pathname.split('/')[2] ?? null
    } else if (youtubeUrl.pathname.includes('/embed/')) {
      videoId = youtubeUrl.pathname.split('/')[2] ?? null
    } else {
      videoId = youtubeUrl.searchParams.get('v')
    }
  } else if (hostname === 'youtu.be') {
    videoId = youtubeUrl.pathname.substring(1)
  }

  return videoId || null
}

const getYouTubeEmbedURL = (url: string): string | null => {
  const videoID = getYouTubeVideoID(url)

  if (!videoID) {
    return null
  }

  return `https://www.youtube-nocookie.com/embed/${videoID}`
}

const mediaBlocks: Block[] = [
  {
    slug: 'image',
    labels: {
      singular: 'Imagem',
      plural: 'Imagens',
    },
    fields: [
      {
        type: 'upload',
        name: 'image',
        label: 'Imagem',
        relationTo: 'media',
        required: true,
        admin: {
          description: 'Tamanho padrão: 630x400',
        },
      },
    ],
  },
  {
    slug: 'video',
    labels: {
      singular: 'Vídeo',
      plural: 'Vídeos',
    },
    fields: [
      {
        type: 'upload',
        name: 'video',
        label: 'Vídeo',
        relationTo: 'media',
        required: true,
        admin: {
          description: 'Envie um arquivo de vídeo pela biblioteca de mídia.',
        },
      },
      {
        type: 'upload',
        name: 'poster',
        label: 'Imagem de capa',
        relationTo: 'media',
        admin: {
          description: 'Imagem exibida antes do vídeo ser reproduzido.',
        },
      },
    ],
  },
  {
    slug: 'youtube',
    labels: {
      singular: 'YouTube',
      plural: 'YouTube',
    },
    fields: [
      {
        type: 'text',
        name: 'url',
        label: 'Link do YouTube',
        required: true,
        admin: {
          description: 'Cole o link normal do YouTube. O embed será gerado automaticamente.',
        },
        validate: (value: null | string | string[] | undefined) => {
          if (typeof value !== 'string' || !getYouTubeEmbedURL(value)) {
            return 'Informe um link válido do YouTube.'
          }

          return true
        },
      },
      {
        type: 'text',
        name: 'embedUrl',
        label: 'Link embed',
        admin: {
          hidden: true,
        },
      },
    ],
  },
]

export const home: GlobalConfig = {
  slug: 'home',
  hooks: {
    beforeValidate: [
      ({ data }) => {
        const withEmbedUrls = (media: unknown) =>
          Array.isArray(media)
            ? media.map((item: ProductMediaItem) => {
                if (item?.blockType !== 'youtube' || typeof item.url !== 'string') {
                  return item
                }

                return {
                  ...item,
                  embedUrl: getYouTubeEmbedURL(item.url),
                }
              })
            : media

        const items = data?.products?.items

        if (Array.isArray(items)) {
          data.products.items = items.map((product) => ({
            ...product,
            media: withEmbedUrls(product.media),
          }))
        }

        if (data?.about) {
          data.about.media = withEmbedUrls(data.about.media)
        }

        return data
      },
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'hero',
          label: 'Hero',
          fields: [
            {
              type: 'richText',
              name: 'title',
              label: 'Title',
              required: true,
            },
            buttonField('ctaHero', 'Botão CTA'),
            {
              type: 'array',
              name: 'gallery',
              label: 'Gallery',
              fields: [
                {
                  type: 'upload',
                  name: 'image',
                  label: 'Image',
                  relationTo: 'media',
                  admin: {
                    description: 'Sem tamanho padrao',
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'about',
          label: 'About',
          fields: [
            {
              type: 'text',
              name: 'title',
              label: 'Title',
            },
            {
              type: 'richText',
              name: 'description',
              label: 'Descrição',
            },
            {
              type: 'blocks',
              name: 'media',
              label: 'Mídia',
              blocks: mediaBlocks,
              maxRows: 1,
              admin: {
                description: 'Escolha uma imagem ou um vídeo (arquivo ou link do YouTube). Tamanho padrão: 630x400',
                initCollapsed: true,
              },
            },
          ],
        },
        {
          name: 'products',
          label: 'Produtos',
          fields: [
            {
              type: 'text',
              name: 'title',
              label: 'Title',
            },
            {
              type: 'upload',
              name: 'image',
              label: 'Imagem',
              relationTo: 'media',
              admin: {
                description: 'Tamanho padrão: 519x539',
              },
            },
            {
              type: 'array',
              name: 'items',
              label: 'Itens de produto',
              fields: [
                {
                  type: 'upload',
                  name: 'icon',
                  label: 'Ícone',
                  relationTo: 'media',
                  admin: {
                    description: 'Tamanho padrão: 35x35',
                  },
                },
                {
                  type: 'upload',
                  name: 'productImage',
                  label: 'Imagem do produto',
                  relationTo: 'media',
                  admin: {
                    description: 'Tamanho padrão: 90x143',
                  },
                },
                {
                  type: 'text',
                  name: 'title',
                  label: 'Title',
                },
                {
                  type: 'richText',
                  name: 'description',
                  label: 'Descrição',
                },
                {
                  type: 'blocks',
                  name: 'media',
                  label: 'Mídia',
                  blocks: mediaBlocks,
                  maxRows: 1,
                  admin: {
                    initCollapsed: true,
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'whereToFind',
          label: 'Onde encontrar',
          fields: [
            {
              type: 'text',
              name: 'title',
              label: 'Title',
            },
            {
              type: 'array',
              name: 'items',
              label: 'Items',
              fields: [
                {
                  type: 'upload',
                  relationTo: 'media',
                  name: 'image',
                  label: 'Imagem',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
