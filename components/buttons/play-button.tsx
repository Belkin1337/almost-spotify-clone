"use client"

import { usePlay } from "@/lib/hooks/player/use-play"
import { usePlayer } from "@/lib/hooks/player/use-player"
import { SongEntity } from "@/types/entities/song"
import { Button } from "@/ui/button"
import { useCallback } from "react"
import { FaPlay } from "react-icons/fa"

type PlayButtonVariants = {
  variant: "default" 
  | "follow"
  | "single_medium" 
  | "single_page" 
  | "action" 
  | "form" 
  | "album_playlist" 
  | null 
  | undefined
}

interface PlayButtonProps extends PlayButtonVariants {
  song: SongEntity,
  list?: SongEntity[]
}

export const PlayButton = ({
  variant,
  song,
  list
}: PlayButtonProps) => {
  const { playerState } = usePlayer()

  const { onPlay } = usePlay({
    song: song,
    songs: list ? list : playerState.ids
  })

  const handlePlay = useCallback(() => { onPlay() }, [onPlay])

  return (
    <Button
      onClick={handlePlay}
      variant={variant}
      className="hover:scale-[1.06]"
      rounded="full"
    >
      <FaPlay className="text-black" />
    </Button>
  )
}