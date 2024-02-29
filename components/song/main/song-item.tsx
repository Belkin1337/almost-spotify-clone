"use client"

import { Button } from "@/ui/button";
import { FaPlay } from "react-icons/fa";
import { useLoadImage } from "@/lib/hooks/image/use-load-image";
import { usePlay } from "@/lib/hooks/player/use-play";
import { usePlayer } from "@/lib/hooks/player/use-player";
import { SongAuthor } from "../child/song-author";
import { SongTitle } from "../child/song-title";
import Image from "next/image";
import { useAudio } from "@/lib/hooks/player/use-audio";
import { SongEntity } from "@/types/entities/song";

interface SongItemProps {
  data: SongEntity;
}

export const SongItem = ({ data }: SongItemProps) => {
  const { onPlay } = usePlay()
  const { playerState } = usePlayer()
  const imagePath = useLoadImage(data);

  return (
    <div onDoubleClick={() => onPlay({
      songId: data.id,
      songs: playerState.ids
    })}
      className="flex flex-col items-center justify-center relative group rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer 
    hover:bg-neutral-400/20 focus-within:bg-neutral-400/20 focus-within:ring-1 focus-within:ring-jade-400 transition p-2">
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image
          className="object-cover"
          src={imagePath || "/images/liked.png"}
          fill
          alt={data.title}
        />
      </div>
      <div className="flex flex-col items-start w-full gap-y-1 py-2">
        <SongTitle data={data} />
        <SongAuthor data={data} />
      </div>
      <div className="absolute bottom-24 right-5">
        <Button
          onClick={() => onPlay({
            songId: data.id,
            songs: playerState.ids
          })}
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