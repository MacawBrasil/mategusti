import { About } from '@/components/about'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { Products } from '@/components/products'
import { WhereToFind } from '@/components/where-to-find'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export default async function HomePage() {
  const payload = await getPayload({
    config: configPromise,
  })

  const [home, settings] = await Promise.all([
    payload.findGlobal({
      slug: 'home',
      depth: 2,
    }),
    payload.findGlobal({
      slug: 'settings',
      depth: 2,
    }),
  ])

  return (
    <>
      <Hero hero={home.hero} logo={settings.logo} />
      <About about={home.about} />
      <Products products={home.products} />
      <WhereToFind whereToFind={home.whereToFind} />
      <Footer settings={settings} />
    </>
  )
}
