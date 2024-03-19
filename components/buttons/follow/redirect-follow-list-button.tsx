"use client"

import { Button } from "@/ui/button";
import { useRouter } from "next/navigation";
import { FaPlay } from 'react-icons/fa';
import Image from "next/image";

interface ListItemProps {
  image: string;
  name: string;
  href: string;
}

export const FollowedTracksButton = ({
  image,
  name,
  href
}: ListItemProps) => {
  const { push } = useRouter();

  return (
    <Button
      onClick={() => {
        push(href)
      }}
      className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4">
      <div className="relative min-h-[82px] min-w-[82px]">
        <Image
          className="object-cover"
          fill
          loading="lazy"
          src={image}
          alt={name}
        />
      </div>
      <p className="text-white font-semibold truncate py-5">
        {name}
      </p>
      <div className="absolute transition opacity-0 rounded-full flex items-center justify-center bg-MAIN p-4 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-105">
        <FaPlay className="text-black" />
      </div>
    </Button>
  );
}