import Image from 'next/image'

import type { Media } from '@/payload-types'

type MediaUpload = string | Media | null | undefined

export type MediaBlockData = {
  blockType?: string | null
  blockName?: string | null
  image?: MediaUpload
  video?: MediaUpload
  poster?: MediaUpload
  url?: string | null
  embedUrl?: string | null
}

function isPopulatedMedia(media: MediaUpload): media is Media & { url: string } {
  return (
    typeof media === 'object' &&
    media !== null &&
    typeof media.url === 'string' &&
    media.url.length > 0
  )
}

type MediaBlockProps = {
  block?: MediaBlockData
  className?: string
  fallbackTitle?: string
}

export function MediaBlock({ block, className = 'h-auto w-full rounded-xl', fallbackTitle = 'Vídeo' }: MediaBlockProps) {
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
        className={className}
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
        className={`aspect-video w-full object-cover ${className}`}
        aria-label={block.video.alt}
      />
    )
  }

  if (block.blockType === 'youtube' && (block.embedUrl || block.url)) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <iframe
          src={block.embedUrl ?? block.url ?? undefined}
          title={block.blockName ?? fallbackTitle}
          className="aspect-video w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    )
  }

  return null
}
