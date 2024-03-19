"use client"

import { usePlayer } from "@/lib/hooks/player/use-player";
import { UserGeneric } from "@/types/entities/user";
import { useInView } from 'react-intersection-observer'
import { Navbar } from "./navbar/navbar";

interface MainPanelProps {
  children: React.ReactNode,
  user: UserGeneric
}

export const MainPanel = ({
  user,
  children
}: MainPanelProps) => {
  const { playerState } = usePlayer();

  const { ref: inViewRef, inView } = useInView({
    threshold: 0,
  });

  return (
    <div className={`bg-DARK_SECONDARY_BACKGROUND overflow-y-auto relative rounded-md w-full 
    ${playerState.active ? 'h-[calc(100%-84px)]' : 'h-full'}`}>
      <Navbar
        user={user}
        inView={inView}
      />
      <div ref={inViewRef}>
        {children}
      </div>
    </div>
  );
}