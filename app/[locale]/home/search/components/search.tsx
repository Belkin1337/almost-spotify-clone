"use client"

import { LikeButton } from "@/components/ui/song/like-button";
import MediaItem from "@/components/ui/song/library-song-item";
import useOnPlay from "@/hooks/use-on-play";
import { Song } from "@/types";

interface SearchContentProps {
  songs: Song[];
}

export const SearchContent = ({ songs }: SearchContentProps) => {
  const onPlay = useOnPlay(songs);

  return (
    songs.length === 0 ? (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">Ничего не найдено.</div>
    ) : (
      <div className="flex flex-col gap-y-2 w-full px-6">
        {songs.map((song) => (
          <div key={song.id} className="flex items-center gap-x-4 w-full">
            <div className="flex-1">
              <MediaItem onClick={(id: string) => onPlay(id)} data={song} />
            </div>
            <LikeButton songId={song.id} />
          </div>
        ))}
      </div>
    )
  );
}