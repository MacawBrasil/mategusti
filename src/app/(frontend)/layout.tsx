import React from 'react'
import { Montserrat } from 'next/font/google'
import localFont from 'next/font/local'

import './styles.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})

const lostaBonita = localFont({
  src: [
    {
      path: '../../../public/fonts/LostaBonita-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/LostaBonita-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/LostaBonita-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/LostaBonita-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/LostaBonita-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/LostaBonita-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/LostaBonita-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/LostaBonita-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/LostaBonita-Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-losta-bonita',
})

export const metadata = {
  description:
    'Mategusti: massas artesanais, molhos autorais e antepastos para encontros memoraveis.',
  title: 'Mategusti',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="pt-BR">
      <body className={`${montserrat.variable} ${lostaBonita.variable}`}>{children}</body>
    </html>
  )
}
