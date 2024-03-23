"use client"

import { artist } from "@/lib/constants/artist"
import { ColoredBackground } from "@/ui/colored-background"
import { ArtistVerifyButton } from "./child/artist-verify-button"
import { ArtistTopSong } from "./child/artist-top-song"
import { ToolsBar } from "../lists/followed/child/followed-tools-bar"
import { usePlayer } from "@/lib/hooks/player/use-player"

export const ArtistProfileItem = () => {
  const { playerState } = usePlayer();
  
  return (
    <div className="w-full">
      <ColoredBackground
        imageUrl={`/images/artist/${artist.avatar_url!}`}
      />
      <div className="-top-[84px] relative overflow-hidden h-[404px] p-6 bg-no-repeat bg-cover z-20 bg-top"
        style={{
          backgroundImage: `url('/images/artist/${artist.cover_image_url}')`
        }}>
        <div className="relative gap-y-2 z-20 flex flex-col justify-end h-full items-start">
          <ArtistVerifyButton />
          <p className="text-white font-extrabold text-[82px]">
            {artist.name}
          </p>
          <p className="text-white font-semibold text-md">
            {artist.listeners} monthly listeners
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-y-12 py-4 w-full relative -top-[84px]">
        <ToolsBar list={playerState.ids} variant="artist" song={playerState.active!} />
        <ArtistTopSong />
      </div>
    </div>
  )
}