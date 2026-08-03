import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ChefHat, Home } from 'lucide-react'

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
        <main className="grid min-h-screen place-items-center bg-background px-5 py-12 text-foreground sm:px-8">
          <section className="mx-auto flex w-full max-w-xl flex-col items-center text-center">
            <Link
              className="mb-12 inline-flex items-center gap-3 transition-opacity active:opacity-50"
              href="/"
              aria-label="Voltar para a Mategusti"
            >
              <span className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground">
                <ChefHat className="size-5" />
              </span>
              <span className="text-lg font-semibold">Mategusti</span>
            </Link>

            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
              Erro 404
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-balance sm:text-5xl">
              Pagina nao encontrada
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">
              A pagina que voce esta procurando nao existe ou mudou de endereco.
            </p>

            <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
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
          </section>
        </main>
      </body>
    </html>
  )
}
