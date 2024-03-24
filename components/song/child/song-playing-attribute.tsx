"use client"

import { UserTips } from "@/components/tooltip/action";
import { useAudioContext } from "@/lib/hooks/player/use-audio";
import { usePlayer } from "@/lib/hooks/player/use-player";
import { SongEntity } from "@/types/entities/song";
import { Typography } from "@/ui/typography";
import { useCallback } from "react";
import { IoMdPlay } from "react-icons/io";
import { MdPause } from "react-icons/md";

type SongPlayingAttributeGeneric = {
  list_id: string,
  song: SongEntity,
  handlePlay: () => void;
}

export const SongPlayingAttribute = ({
  list_id,
  song,
  handlePlay
}: SongPlayingAttributeGeneric) => {
  const { playing, handleTogglePlay } = useAudioContext();
  const { playerState } = usePlayer();

  const playingHandler = useCallback(() => {    
    if (song.id === playerState.active?.id) {
      handleTogglePlay()
    } else {
      handlePlay()
    }
  }, [handlePlay, song.id, playerState.active?.id, handleTogglePlay])

  return (
    <div className="px-4 relative overflow-hidden w-[46px]">
      {(playerState.active?.id === song.id && playing) ? (
        <>
          <div className="group-hover:hidden flex bars">
            <div className="bars__item" />
            <div className="bars__item" />
            <div className="bars__item" />
            <div className="bars__item" />
          </div>
          <div onClick={playingHandler} className="group-hover:block hidden">
            <UserTips action="Pause">
              <MdPause size={22} className="mr-2"/>
            </UserTips>
          </div>
        </>
      ) : (
        <>
          <Typography className="!text-neutral-400 group-hover:hidden block">
            {list_id}
          </Typography>
          <div onClick={playingHandler} className="group-hover:block hidden">
            <UserTips action={`Play ${song.title} by ${song.author}`}>
              <IoMdPlay size={20} />
            </UserTips>
          </div>
        </>
      )}
    </div>
  )
}