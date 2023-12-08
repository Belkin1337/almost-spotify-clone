import { ThemeProvider } from '@/providers/theme-provider';

import './globals.css'
import 'react-toastify/dist/ReactToastify.css';

import type { Metadata } from 'next'

import localFont from "next/font/local"

const font = localFont({
  src: "../public/font/Montserrat.ttf",
});

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Smotify | Web Player',
  description: 'Слушай музыку, находись на чилле, вдохновляйся писать свою!',
  robots: "no follow",
  viewport: "initial-scale=1.0, width=device-width"
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${font.className}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}