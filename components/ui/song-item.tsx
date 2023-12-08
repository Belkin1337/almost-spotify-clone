"use client"

import useLoadImage from "@/hooks/use-load-image";
import { Song } from "@/types";
import Image from "next/image";
import { PlayButton } from "./play-button";

interface SongItemProps {
  data: Song;
  onClick: (id: string) => void
}

export const SongItem = ({ data, onClick }: SongItemProps) => {
  const imagePath = useLoadImage(data);

  return (
    <div onClick={() => onClick(data.id)} className="flex flex-col items-center justify-center relative
    group rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-2">
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image className="object-cover" src={imagePath || "/images/liked.png"} fill alt="Image"/>
      </div>
      <div className="flex flex-col items-start w-full py-2 gap-y-1">
        <p className="font-semibold text-white truncate w-full">{data.title}</p>
        <p className="text-neutral-400 text-[1rem] font-medium pb-2 w-full truncate">{data.author}</p>
      </div>
      <div className="absolute bottom-24 right-5">
        <PlayButton />
      </div>
    </div>
  );
}