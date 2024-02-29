import { SongEntity } from "@/types/entities/song";
import React, { createContext, useState } from "react";

interface PlayerState {
  activeId: string;
  ids: SongEntity[];
}

interface PlayerContextType {
  playerState: PlayerState,
  setActiveId: (id: string, ids: SongEntity[]) => void;
  getActiveSong: () => SongEntity | undefined;
}

export const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ 
  children 
}: { 
  children: React.ReactNode 
}) => {
  const [playerState, setPlayerState] = useState<PlayerState>({
    activeId: '',
    ids: [],
  });

  const setActiveId = (id: string, ids: SongEntity[]) => {
    setPlayerState({
      activeId: id,
      ids: ids
    });
  };
  
  const getActiveSong = (): SongEntity | undefined => {
    if (!playerState.ids || playerState.ids.length === 0) {
      return undefined;
    }
    return playerState.ids.find(song => song.id === playerState.activeId);
  };

  return (
    <PlayerContext.Provider value={{ getActiveSong, playerState, setActiveId }}>
      {children}
    </PlayerContext.Provider>
  );
};