import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ChefHat, Home, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'

import './(frontend)/styles.css'

export const metadata: Metadata = {
  description: 'A pagina que voce esta procurando nao foi encontrada.',
  title: 'Pagina nao encontrada | Mategusti',
}

export default function GlobalNotFound() {
  return (
    <html lang="pt-BR">
      <body>
        <main className="relative grid min-h-screen overflow-hidden bg-background px-5 py-10 text-foreground sm:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(207,62,46,0.16),transparent_28%),linear-gradient(135deg,#fffaf2_0%,#f4eadb_54%,#211a16_54%,#17120f_100%)]" />

          <section className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="max-w-2xl">
              <Link className="mb-10 inline-flex items-center gap-3" href="/" aria-label="Voltar para a Mategusti">
                <span className="grid size-11 place-items-center rounded-full bg-primary text-primary-foreground">
                  <ChefHat className="size-5" />
                </span>
                <span className="text-xl font-semibold">Mategusti</span>
              </Link>

              <p className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white/70 px-4 py-2 text-sm font-semibold text-primary shadow-sm">
                <Search className="size-4" />
                erro 404
              </p>
              <h1 className="mt-6 text-5xl font-semibold leading-none text-balance sm:text-7xl">
                Esta receita saiu do cardapio.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                A pagina nao existe, mudou de endereco ou foi removida. Volte para a home para
                continuar escolhendo massas, antepastos e encomendas.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/">
                    <Home />
                    Voltar para home
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/#cardapio">
                    <ArrowLeft />
                    Ver cardapio
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative mx-auto aspect-square w-full max-w-[560px]">
              <div className="absolute inset-[6%] rounded-full bg-[#f5efe5] shadow-[0_34px_90px_rgba(34,22,13,0.24)]" />
              <div className="absolute inset-[18%] rounded-full border-[24px] border-[#fffdf8] bg-[#cf3e2e]" />
              <div className="absolute inset-[31%] rounded-full border-[14px] border-[#f8d9a7] bg-[#fffaf2]" />
              <div className="absolute left-[25%] top-[29%] size-[14%] rounded-full bg-[#315d36]" />
              <div className="absolute right-[27%] top-[36%] size-[11%] rounded-full bg-[#8f2c23]" />
              <div className="absolute bottom-[27%] left-[35%] size-[9%] rounded-full bg-[#315d36]" />
              <div className="absolute inset-0 grid place-items-center">
                <span className="text-[8rem] font-semibold leading-none text-[#211a16] sm:text-[10rem]">
                  404
                </span>
              </div>
            </div>
          </section>
        </main>
      </body>
    </html>
  )
}
