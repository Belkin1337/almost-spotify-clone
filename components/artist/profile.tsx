"use client"

import { artist } from "@/lib/constants/artist"
import { ColoredBackground } from "@/ui/colored-background"
import { FaPlay } from "react-icons/fa"

export const ArtistProfileItem = () => {
  return (
    <div className="w-full">
      <ColoredBackground imageUrl={`/images/artist/${artist.avatar_url!}`} />
      <div className="relative overflow-hidden h-[424px] p-6 bg-no-repeat bg-cover z-20 bg-top"
        style={{ 
          backgroundImage: `url('/images/artist/${artist.cover_image_url}')`
        }}>
        <div className="relative z-20 flex flex-col justify-end h-full items-start">
          <p className="text-white font-bold text-6xl">

          </p>
        </div>
      </div>
      <div className="h-full flex flex-col p-6">
        <button className="transition rounded-full w-[48px] h-[48px] items-center flex bg-jade-500 p-4 hover:scale-[1.12]">
          <FaPlay className="text-black" />
        </button>
      </div>
    </div>
  )
}