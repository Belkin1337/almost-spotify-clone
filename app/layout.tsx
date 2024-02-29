import { ThemeProvider } from '@/providers/theme-provider';
import type { Metadata } from 'next'
import localFont from "next/font/local"
import './globals.css'

const font = localFont({
  src: "../public/font/Montserrat.ttf",
});

export const metadata: Metadata = {
  title: 'Smotify | Web Player',
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