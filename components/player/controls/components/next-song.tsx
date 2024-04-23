import { AiFillStepForward } from "react-icons/ai"
import { usePlayNext } from "@/lib/hooks/player/use-play-next";
import { memo } from "react";

export const PlayerNextSong = memo(() => {
  const { onPlayNext } = usePlayNext();

  return (
    <AiFillStepForward
      onClick={() => onPlayNext()}
      size={26}
      className="text-neutral-400 cursor-pointer hover:text-white transition"
    />
  )
})
PlayerNextSong.displayName === 'PlayerNextSong'