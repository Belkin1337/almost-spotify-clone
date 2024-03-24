import { SongEntity } from "@/types/entities/song";
import React, { createContext, useState } from "react";

interface PlayerState {
  active: SongEntity | undefined;
  ids: SongEntity[];
}

interface PlayerContextType {
  playerState: PlayerState,
  setActiveId: (
    id: SongEntity | undefined, 
    ids: SongEntity[]
  ) => void;
}

export const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ 
  children 
}: { 
  children: React.ReactNode 
}) => {
  const [playerState, setPlayerState] = useState<PlayerState>({
    active: undefined,
    ids: [],
  });

  const setActiveId = (
    id: SongEntity | undefined, 
    ids: SongEntity[]
  ) => {
    setPlayerState({
      active: id,
      ids: ids
    });
  };

  // console.log(
  //   "\n\n=== Active Song State: \n\n", 
  //   playerState.active, 
  //   playerState.ids,
  //   "\n\n=== \n\n"
  // )

  return (
    <PlayerContext.Provider value={{ 
      playerState, 
      setActiveId 
    }}>
      {children}
    </PlayerContext.Provider>
  );
};