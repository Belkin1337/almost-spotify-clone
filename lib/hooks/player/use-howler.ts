"use client";

import { useGetSongById } from "@/lib/hooks/actions/song/use-get-song-by-id";
import { useLoadSongUrl } from "@/lib/hooks/actions/song/use-load-song-url";
import { usePlayNext } from "@/lib/hooks/player/controls/use-play-next";
import { usePlayer } from "@/lib/hooks/player/use-player";
import { useContext, useEffect, useMemo, useState } from "react";
import { Howl } from "howler";
import { usePlayPrev } from "./controls/use-play-prev";
import { useDuration } from "./controls/use-duration";
import { AudioContext } from "@/providers/audio-state-provider";
import { useUser } from "../actions/user/auth/use-user";

export const useHowlerContext = () => {
  const audioContext = useContext(AudioContext);

  if (!audioContext) {
    throw new Error('useAudioContext must be used within an AudioProvider');
  }

  return audioContext;
};

export const useHowler = () => {
  const [position, setPosition] = useState<number>(0);

  const { 
    isLoaded, 
    playing, 
    setIsLoaded, 
    setPlaying,
    howlInstance,
    setHowlInstance,
    handleTogglePlay
  } = useHowlerContext();

  const { playerState } = usePlayer();
  const { user } = useUser()
  const { song } = useGetSongById(playerState.active?.id!);
  const { formatted, raw } = useDuration(song!);
  const { onPlayNext } = usePlayNext();
  const { onPlayPrev } = usePlayPrev();

  const songUrl = useLoadSongUrl(song!);

  useEffect(() => {
    if (howlInstance) {
      setIsLoaded(false);
      howlInstance.unload();
    }

    if (songUrl && user) {
      const newHowl = new Howl({
        src: songUrl,
        autoplay: playerState.active?.id === song?.id!,
        format: ["mp3"],
        html5: true,
        onplay: () => {
          setPlaying(true);
        },
        onpause: () => {
          setPlaying(false);
        },
        onend: () => {
          onPlayNext();
        },
        onload: () => {
          setIsLoaded(true);
        },
      });

      setHowlInstance(newHowl);
    }
  }, [songUrl, playerState.active?.id, song?.id!]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (howlInstance && howlInstance.playing()) {
        setPosition(howlInstance.seek());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [howlInstance]);

  const handleSliderChange = useMemo(() => (value: number) => {
    if (howlInstance) {
      howlInstance.seek(value);
      setPosition(value);
    }
  }, [howlInstance]);

  return {
    howlInstance,
    setPlaying,
    playing,
    song,
    onPlayNext,
    onPlayPrev,
    position,
    isLoaded,
    setPosition,
    handleTogglePlay,
    formatted,
    raw,
    handleSliderChange,
  };
};