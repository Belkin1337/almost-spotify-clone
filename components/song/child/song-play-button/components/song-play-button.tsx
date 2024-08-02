"use client"

import { usePlay } from "@/lib/hooks/player/use-play"
import { Button } from "@/ui/button"
import { useCallback } from "react"
import { FaPause, FaPlay } from "react-icons/fa"
import { usePlayerStateQuery } from "@/lib/query/player/player-state-query";
import { IPlayButton } from "@/components/song/child/song-play-button/types/song-play-button-types";
import { UserTips } from "@/components/tooltip/components/action";
import { useStopPlayAudio } from "@/components/player/hooks/use-stop-play-audio";
import { useAudioStateQuery } from "@/lib/query/player/audio-state-query";

export const SongPlayButton = ({
  variant,
  song,
  song_list
}: IPlayButton) => {
  const { playerAttributes } = usePlayerStateQuery();
  const { onPlay } = usePlay();
  const { audioAttributes } = useAudioStateQuery()
  const { stop } = useStopPlayAudio()

  const howl = audioAttributes.howl;
  const songArray = song_list ? song_list : playerAttributes.ids || [];

  const handlePlay = useCallback(async() => {
    await onPlay({
      song: song,
      songs: songArray
    })
  }, [onPlay, playerAttributes.ids, song])

  const playingHandler = useCallback(async () => {
    if (howl) {
      if (song?.id === playerAttributes?.active?.id) {
        stop(howl)
      } else {
        await handlePlay()
      }
    }
  }, [howl, stop, handlePlay, song?.id, playerAttributes?.active?.id])

  const currentIsPlaying = playerAttributes.isPlaying;
  const currentActiveSongId = playerAttributes?.active?.id;
  const targetSongId = song?.id;

  return (
    <UserTips action="Play">
      <Button
        onClick={playingHandler}
        variant={variant}
        align="centered"
        background_color="jade"
        className="hover:scale-[1.06]"
        rounded="full"
      >
        {(targetSongId === currentActiveSongId && currentIsPlaying) ? (
          <FaPause className="text-black"/>
        ) : (
          <FaPlay className="text-black" />
        )}
      </Button>
    </UserTips>
  )
}