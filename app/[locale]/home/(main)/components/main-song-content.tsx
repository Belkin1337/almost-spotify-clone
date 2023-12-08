"use client"

import { SongItem } from "@/components/ui/song-item";
import useOnPlay from "@/hooks/use-on-play";
import { Song } from "@/types";

interface PageContentProps {
  songs: Song[];
}

export const MainSongContent = ({ songs }: PageContentProps) => {
  const onPlay = useOnPlay(songs);

  return (
    songs.length === 0 ? (
      <div className="mt-4 text-neutral-400">
        Нет доступных треков...
      </div>
    ) : (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
        {songs.map((item) => (
          <SongItem key={item.id} onClick={(id: string) => onPlay(id)} data={item} />
        ))}
      </div>
    )
  );
}