"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from 'react-icons/fa';

interface ListItemProps {
  image: string;
  name: string;
  href: string;
}

export const ListItem = ({ image, name, href }: ListItemProps) => {
  const router = useRouter();

  return (
    <button onClick={() => router.push(href)} className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4">
      <div className="relative min-h-[82px] min-w-[82px]">
        <Image className="object-cover" fill src={image} alt="Image"/>
      </div>
      <p className="text-white font-semibold truncate py-5">{name}</p>
      <div className="absolute transition opacity-0 rounded-full flex items-center justify-center bg-MAIN p-4 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-105">
        <FaPlay className="text-black" />
      </div>
    </button>
  );
}