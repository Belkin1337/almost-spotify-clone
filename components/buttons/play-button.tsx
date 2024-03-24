"use client"

import { useAudioContext } from "@/lib/hooks/player/use-audio"
import { usePlay } from "@/lib/hooks/player/use-play"
import { usePlayer } from "@/lib/hooks/player/use-player"
import { SongEntity } from "@/types/entities/song"
import { Button } from "@/ui/button"
import { useCallback } from "react"
import { FaPlay, FaPause } from "react-icons/fa"

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
  const { playing, handleTogglePlay } = useAudioContext()
  const { playerState } = usePlayer()

  const { onPlay } = usePlay({
    song: song,
    songs: list ? list : playerState.ids
  })

  const playingHandler = useCallback(() => {    
    if (song.id === playerState.active?.id) {
      handleTogglePlay()
    } else {
      onPlay()
    }
  }, [onPlay, song.id, playerState.active?.id, handleTogglePlay])

  return (
    <Button
      onClick={playingHandler}
      variant={variant}
      className="hover:scale-[1.06]"
      rounded="full"
    >
      {song.id === playerState.active?.id && playing ? (
        <FaPause className="text-black"/>
      ) : (
        <FaPlay className="text-black" />
      )}
    </Button>
  )
}