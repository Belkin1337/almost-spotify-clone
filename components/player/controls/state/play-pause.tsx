"use client"

import { VariantProps, cva } from "class-variance-authority";
import { useEffect } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";

const playerPlayPauseVariants = cva("items-center border active:scale-[0.9] active:duration-300 duration-500 justify-center h-9 w-9 rounded-full bg-white p-1", {
  variants: {
    variant: {
      desktop: "hidden md:flex",
      mobile: "md:hidden flex"
    }
  },
  defaultVariants: {
    variant: "desktop"
  }
})

export interface PlayerPlayPauseProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof playerPlayPauseVariants> {
  state: boolean,
  onClick: () => void;
}

export const PlayerPlayPause = ({
  className,
  variant,
  onClick,
  state
}: PlayerPlayPauseProps) => {
  const Icon = state ? BsPauseFill : BsPlayFill;

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        onClick();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [onClick]);

  return (
    <div
      onClick={onClick}
      className={playerPlayPauseVariants(({
        variant,
        className
      }))}>
      <Icon
        size={26}
        className="cursor-pointer text-black"
      />
    </div>
  )
}