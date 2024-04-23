"use client"

import { usePlay } from "@/lib/hooks/player/use-play"
import { Button } from "@/ui/button"
import { useCallback } from "react"
import { FaPlay, FaPause } from "react-icons/fa"
import { usePlayerStateQuery } from "@/lib/query/player/player-state-query";
import { usePlayer } from "@/components/player/hooks/use-player";
import { IPlayButton } from "@/components/song/child/song-play-button/types/song-play-button-types";

export const SongPlayButton = ({
  variant,
  song,
  song_list
}: IPlayButton) => {
  const { playerAttributes } = usePlayerStateQuery();
  const { setPlayerAttributes } = usePlayer()
  const { onPlay } = usePlay();

  const handlePlay = async () => {
    await onPlay({
      song: song,
      songs: song_list ? song_list : playerAttributes.ids || []
    })
  }

  const playingHandler = useCallback(() => {    
    if (song?.id === playerAttributes?.active?.id) {
      setPlayerAttributes.mutate({
        isPlaying: !playerAttributes?.isPlaying
      })
    } else {
      handlePlay()
    }
  }, [onPlay, song?.id, playerAttributes?.active?.id, setPlayerAttributes])

  return (
    <Button
      onClick={playingHandler}
      variant={variant}
      align="centered"
      background_color="jade"
      className="hover:scale-[1.06]"
      rounded="full"
    >
      {song?.id === playerAttributes?.active?.id && playerAttributes.isPlaying ? (
        <FaPause className="text-black"/>
      ) : (
        <FaPlay className="text-black" />
      )}
    </Button>
  )
}