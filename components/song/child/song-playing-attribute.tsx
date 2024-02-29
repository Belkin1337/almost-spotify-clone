"use client"

import { usePlayer } from "@/lib/hooks/player/use-player";
import { IoMdPlay } from "react-icons/io";
import { MdPause } from "react-icons/md";

type SongPlayingAttributeGeneric = {
  dataId: string,
}

export const SongPlayingAttribute = ({ dataId }: SongPlayingAttributeGeneric) => {
  const { playerState } = usePlayer()

  return (
    <div className="px-4 relative overflow-hidden w-[46px]">
      {playerState.activeId === dataId ? (
        <div className="group-hover:block hidden text-3xl">
          <MdPause size={20} />
        </div>
      ) : (
        <div className="group-hover:block hidden text-3xl">
          <IoMdPlay size={20} />
        </div>
      )}
      {playerState.activeId === dataId ? (
        <div className="loading-wave group-hover:hidden visible">
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
        </div>
      ) : (
        <p className="group-hover:hidden block">
          {dataId}
        </p>
      )}
    </div>
  )
}