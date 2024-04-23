import { AiFillStepBackward } from "react-icons/ai"
import { usePlayPrev } from "@/lib/hooks/player/use-play-prev";

export const PlayerPrevSong = () => {
  const { onPlayPrev } = usePlayPrev();

  return (
    <AiFillStepBackward
      onClick={() => onPlayPrev()}
      size={26}
      className="text-neutral-400 cursor-pointer hover:text-white transition"
    />
  )
}