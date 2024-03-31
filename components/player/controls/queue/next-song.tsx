"use client"

import { AiFillStepForward } from "react-icons/ai"

interface PlayerNextSongProps {
  onClick: () => void
}

// @ts-ignore
export const PlayerNextSong = ({ onClick }: PlayerNextSongProps) => {
  return (
    <AiFillStepForward
      onClick={onClick}
      size={26}
      className="text-neutral-400 cursor-pointer hover:text-white transition"
    />
  )
}