"use client";

import { useGetSongById } from "@/lib/hooks/actions/song/use-get-song-by-id";
import { useLoadSongUrl } from "@/lib/hooks/actions/song/use-load-song-url";
import { usePlayNext } from "@/lib/hooks/player/use-play-next";
import { usePlayer } from "@/lib/hooks/player/use-player";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Howl } from "howler";
import { usePlayPrev } from "./use-play-prev";

export const useAudio = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [position, setPosition] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);
  const [howlInstance, setHowlInstance] = useState<Howl | null>(null);
  const { playerState } = usePlayer();
  const { song } = useGetSongById(playerState.active?.id!);
  const { onPlayNext } = usePlayNext();
  const { onPlayPrev } = usePlayPrev();
  const { data: url } = useLoadSongUrl(song!);
  const songUrl = url?.song.publicUrl;

  useEffect(() => {
    if (howlInstance) {
      howlInstance.unload();
    }

    if (url && songUrl) {
      const newHowl = new Howl({
        src: songUrl,
        autoplay: true,
        format: ["mp3"],
        html5: true,
        onplay: () => {
          if (!playing) {
            setPlaying(true);
          }
        },
        onpause: () => {
          if (playing) {
            setPlaying(false);
          }
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

    return () => {
      if (howlInstance) {
        howlInstance.unload();
      }
    };
  }, [songUrl, url]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (howlInstance && howlInstance.playing()) {
        setPosition(howlInstance.seek());
        setDuration(howlInstance.duration());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [howlInstance]);

  const handleSliderChange = useMemo(
    () => (value: number) => {
      if (howlInstance) {
        howlInstance.seek(value);
        setPosition(value);
      }
    },
    [howlInstance]
  );

  const handleTogglePlay = useCallback(() => {
    if (howlInstance) {
      if (playing) {
        howlInstance.pause();
      } else {
        howlInstance.play();
      }

      setPlaying(!playing);
    }
  }, [howlInstance, playing])

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
    duration,
    handleSliderChange,
    setDuration,
  };
};