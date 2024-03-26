"use client"

import { useHowlerContext } from "@/lib/hooks/player/use-howler";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";

export interface PlayerPlayPauseProps
  extends React.HTMLAttributes<HTMLDivElement> {
    variant: "desktop" | "mobile",
    state: boolean,
    onClick: () => void;
}

export const PlayerPlayPause = ({
  variant,
  onClick,
  state
}: PlayerPlayPauseProps) => {
  const { isLoaded } = useHowlerContext();
  
  const Icon = state ? BsPauseFill : BsPlayFill;

  // useEffect(() => {
  //   const handleKeyPress = (event: KeyboardEvent) => {
  //     if (event.code === 'Space') {
  //       onClick();
  //     }
  //   };

  //   document.addEventListener('keydown', handleKeyPress);

  //   return () => {
  //     document.removeEventListener('keydown', handleKeyPress);
  //   };
  // }, [onClick]);

  return (
    <div
      onClick={onClick}
      className={`
      ${variant === 'desktop' && 'hidden md:flex'} 
      ${variant === 'mobile' && 'md:hidden flex'} 
      ${isLoaded ? 'bg-white cursor-pointer' : 'bg-neutral-800 cursor-not-allowed'} 
      items-center border active:scale-[0.9] active:duration-300 duration-500 justify-center h-9 w-9 rounded-full p-1`}>
      <Icon
        size={26}
        className={`text-black`}
      />
    </div>
  )
}