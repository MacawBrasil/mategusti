import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Metadata } from 'next'
import { cache } from 'react'

import { Footer } from '@/components/footer'
import { RichText } from '@/components/richtext'

export const dynamic = 'force-dynamic'

function formatDate(value: string | null | undefined) {
  if (!value) {
    return null
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return null
  }

  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

const getPrivacyPolicyData = cache(async () => {
  const payload = await getPayload({
    config: configPromise,
  })

  const [privacyPolicy, settings] = await Promise.all([
    payload.findGlobal({
      slug: 'privacyPolicy',
      depth: 2,
    }),
    payload.findGlobal({
      slug: 'settings',
      depth: 2,
    }),
  ])

  return { privacyPolicy, settings }
})

export async function generateMetadata(): Promise<Metadata> {
  const { privacyPolicy } = await getPrivacyPolicyData()

  return {
    title: `${privacyPolicy.title} | Mategusti`,
    description: privacyPolicy.description,
  }
}

export default async function PrivacyPolicyPage() {
  const { privacyPolicy, settings } = await getPrivacyPolicyData()
  const formattedLastUpdated = formatDate(privacyPolicy.lastUpdated)

  return (
    <>
      <main className="bg-[#FCF8E8] text-[#4C1514]">
        <section className="relative isolate overflow-hidden bg-[#531E17] px-6 pb-20 pt-8 text-[#FCF8E8] lg:px-12 xl:px-16">
          <Image
            src="/casa-hero.svg"
            alt=""
            width={1631}
            height={768}
            priority
            style={{ height: 'auto' }}
            className="pointer-events-none absolute left-1/2 top-0 z-0 h-auto w-[980px] -translate-x-1/2 opacity-25 sm:w-[1200px] lg:w-[1631px]"
          />

          <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-16">
            <Link
              href="/"
              className="inline-flex w-fit items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] transition-colors hover:text-[#21AA50] active:opacity-50"
            >
              <ArrowLeft className="size-4" />
              Início
            </Link>

            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#21AA50]">
                Mategusti
              </p>
              <h1 className="mt-4 text-5xl font-bold leading-none sm:text-6xl md:text-7xl">
                {privacyPolicy.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#FCF8E8]/85">
                {privacyPolicy.description}
              </p>
            </div>
          </div>
        </section>

        <section className="relative px-6 py-16 lg:px-12 xl:px-16">
          <div className="pointer-events-none absolute left-0 right-0 top-0 h-[30px] bg-[url('/xadrez.png')] bg-cover bg-center" />

          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[220px_1fr]">
            <aside className="text-sm font-semibold leading-7 text-[#4C1514]/75">
              <p>Última atualização</p>
              {formattedLastUpdated ? (
                <p className="font-bold text-[#4C1514]">{formattedLastUpdated}</p>
              ) : null}
            </aside>

            <RichText
              data={privacyPolicy.content}
              className="grid gap-4 text-base leading-8 text-[#4C1514]/80 [&_a]:font-bold [&_a]:underline [&_h2]:mt-6 [&_h2]:font-title [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:text-[#4C1514] [&_h2:first-child]:mt-0"
            />
          </div>
        </section>
      </main>

      <Footer settings={settings} />
    </>
  )
}
