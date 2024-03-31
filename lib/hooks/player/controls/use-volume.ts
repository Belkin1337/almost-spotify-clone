"use client"

import { useCallback, useState } from "react";
import { Howler } from "howler"

let globalVolume: number = 1;
let previousVolume: number = 1;

export const useVolume = () => {
  const [volume, setVolume] = useState<number>(globalVolume);

  const setGlobalVolume = useCallback((newVolume: number) => {
    previousVolume = globalVolume;
    globalVolume = newVolume;
    setVolume(newVolume);
    Howler.volume(newVolume)
  }, []);

  const handleVolumeChange = useCallback((newVolume: number) => {
    previousVolume = globalVolume;
    setGlobalVolume(newVolume);
  }, [setGlobalVolume]);

  const mute = useCallback(() => {
    previousVolume = globalVolume; 
    setGlobalVolume(0);
  }, [setGlobalVolume]);

  const unmute = useCallback(() => {
    setGlobalVolume(previousVolume); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setGlobalVolume, previousVolume]);

  return { 
    volume,
    setVolume: setGlobalVolume,
    handleVolumeChange,
    mute, 
    unmute
  };
};