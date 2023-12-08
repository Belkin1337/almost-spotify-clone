"use client"

import { SongItem } from "@/components/ui/song/song-item";
import useOnPlay from "@/hooks/use-on-play";
import { useScopedI18n } from "@/locales/client";
import { Song } from "@/types";

interface PageContentProps {
  songs: Song[];
}

export const MainSongContent = ({ songs }: PageContentProps) => {
  const onPlay = useOnPlay(songs);
  const mainSongContentLocale = useScopedI18n('main-service.pages.main-content')

  return songs.length === 0 ? ( <div className="mt-4 text-neutral-400">{mainSongContentLocale('navbar.no-available-tracks')}</div> ) 
  : (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4 overflow-y-scroll">
        {songs.map((item) => (
          <SongItem key={item.id} onClick={(id: string) => onPlay(id)} data={item} />
        ))}
      </div>
    )
}