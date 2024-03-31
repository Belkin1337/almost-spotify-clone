"use client"

import { I18nProviderClient } from '@/locales/client'
import { Toaster } from '@/ui/toaster'
import { TooltipProvider } from '@/ui/tooltip';
import { AudioProvider } from '@/providers/audio-state-provider';
import QueryProvider from '@/providers/query-provider';
import dynamic from 'next/dynamic';

const SongWidgetProvider = dynamic(() => import("@/providers/song-widget-provider").then(mod => mod.SongWidgetProvider))
const PlayerProvider = dynamic(() => import("@/providers/player-provider").then(mod => mod.PlayerProvider))
const DialogProvider = dynamic(() => import("@/providers/dialog-provider").then(mod => mod.DialogProvider))

export default function SubLayout({
  params: { locale },
  children
}: {
  params: { locale: string },
  children: React.ReactNode
}) {
  return (
    <QueryProvider>
      <I18nProviderClient locale={locale}>
        <TooltipProvider>
          <DialogProvider>
            <AudioProvider>
              <PlayerProvider>
                <SongWidgetProvider>
                  <Toaster />
                  {children}
                </SongWidgetProvider>
              </PlayerProvider>
            </AudioProvider>
          </DialogProvider>
        </TooltipProvider>
      </I18nProviderClient>
    </QueryProvider>
  )
}