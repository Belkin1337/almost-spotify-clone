import { ToastContainer } from 'react-toastify'
import getSongsByUserId from '@/actions/get-songs-by-userId'

import { SupabaseProvider } from '@/providers/supabase-provider'
import { UserProvider } from '@/providers/user-provider'
import { ModalProvider } from '@/providers/modal-provider'
import { LocaleProvider } from '@/providers/locale-provider'

import { Sidebar } from '@/components/sidebar/sidebar'
import { Player } from '@/components/ui/player/player'

export const revalidate = 0;

export default async function RootLayout({ params: { locale }, children }: { params: { locale: string }, children: React.ReactNode }) {
  const userSongs = await getSongsByUserId();

  return (
    <LocaleProvider locale={locale}>
      <SupabaseProvider>
        <ToastContainer />
        <UserProvider>
          <ModalProvider />
          <Sidebar songs={userSongs}>
            {children}
          </Sidebar>
          <Player />
        </UserProvider>
      </SupabaseProvider>
    </LocaleProvider>
  )
}