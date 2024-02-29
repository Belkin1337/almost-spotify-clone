"use client"

import { DialogProvider } from '@/providers/dialog-provider'
import { I18nProviderClient } from '@/locales/client'
import { Toaster } from '@/ui/toaster'
import { PlayerProvider } from '@/providers/player-provider';
import { SongWidgetProvider } from '@/providers/song-widget-provider';
import QueryProvider from '@/providers/query-provider';

export default function SubLayout({ params: { locale }, children }: { params: { locale: string }, children: React.ReactNode }) {
  return (
    <QueryProvider>
      <I18nProviderClient locale={locale}>
        <DialogProvider>
          <PlayerProvider>
            <SongWidgetProvider>
              <Toaster />
              {children}
            </SongWidgetProvider>
          </PlayerProvider>
        </DialogProvider>
      </I18nProviderClient>
    </QueryProvider>
  )
}