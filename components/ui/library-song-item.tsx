"use client"

import useLoadImage from "@/hooks/use-load-image";
import { usePlayer } from "@/hooks/use-player";
import useSound from "use-sound";
import { Song } from "@/types";
import Image from "next/image";

interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
  isPlayerComponent?: boolean,
}

export default function LibrarySongItem({ data, onClick, isPlayerComponent }: MediaItemProps) {
  const imageUrl = useLoadImage(data);
  const player = usePlayer();

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }

    return player.setId(data.id);
  }

  return (
    <div className="flex items-center gap-x-3 w-full p-2 cursor-pointer hover:bg-neutral-800/50 rounded-md" onClick={handleClick}>
      <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        <Image fill
          src={imageUrl || "/images/liked.png"}
          alt="Media Item"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate">{data.title}</p>
        <p className="text-neutral-400 text-sm truncate">{data.author}</p>
      </div>
    </div>
  );
}