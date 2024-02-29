"use client"

import { AiFillStepBackward } from "react-icons/ai"

interface PlayerPrevSongProps {
  onClick: () => void
}

export const PlayerPrevSong = ({ onClick }: PlayerPrevSongProps) => {
  return (
    <AiFillStepBackward
      onClick={onClick}
      size={26}
      className="text-neutral-400 hover:text-white transition"
    />
  )
}