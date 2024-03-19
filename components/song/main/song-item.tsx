"use client"

import { Button } from "@/ui/button";
import { FaPlay } from "react-icons/fa";
import { useLoadImage } from "@/lib/hooks/image/use-load-image";
import { usePlay } from "@/lib/hooks/player/use-play";
import { usePlayer } from "@/lib/hooks/player/use-player";
import { SongAuthor } from "../child/song-author";
import { SongTitle } from "../child/song-title";
import { SongEntity } from "@/types/entities/song";
import { useCallback } from "react";
import Image from "next/image";

interface SongItemProps {
  song: SongEntity;
}

export const SongItem = ({
  song
}: SongItemProps) => {
  const { playerState } = usePlayer()
  const { onPlay } = usePlay({
    song: song,
    songs: playerState.ids
  })
  const imageUrl = useLoadImage(song?.image_path);

  const handlePlay = useCallback(() => { onPlay() }, [onPlay])

  return (
    <div onDoubleClick={handlePlay}
      className="flex flex-col items-center justify-center relative group rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer 
    hover:bg-neutral-400/20 focus-within:bg-neutral-400/20 focus-within:ring-1 focus-within:ring-jade-400 transition p-2">
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image
          className="object-cover"
          src={imageUrl || "/images/liked.png"}
          fill
          alt={song.title}
        />
      </div>
      <div className="flex flex-col items-start w-full gap-y-1 py-2">
        <SongTitle song={song} />
        <SongAuthor author={song.author} />
      </div>
      <div className="absolute bottom-24 right-5">
        <Button
          onClick={handlePlay}
          variant="main_play"
          size="md"
          rounded="large"
        >
          <FaPlay className="text-black" />
        </Button>
      </div>
    </div>
  );
}