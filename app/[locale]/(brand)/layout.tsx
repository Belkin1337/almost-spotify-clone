import type { Metadata } from 'next'
import { Header } from '@/components/header/header'

import { Footer } from '../../../components/footer/footer'
import { LocaleProvider } from '@/providers/locale-provider'
import { ToastContainer } from 'react-toastify'

export const metadata: Metadata = {
  title: 'Smotify',
}

export default function RootLayout({ params: { locale }, children }: { params: { locale: string }, children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full items-center bg-DARK_MAIN_BACKGROUND bg-opacity-25 bg-no-repeat">
      <ToastContainer />
      <LocaleProvider locale={locale}>
        <Header />
        {children}
        <Footer />
      </LocaleProvider>
    </div>
  )
}
