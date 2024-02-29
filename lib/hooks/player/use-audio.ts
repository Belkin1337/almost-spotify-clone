"use client"

import { useGetSongById } from "@/lib/hooks/actions/song/use-get-song-by-id";
import { useLoadSongUrl } from "@/lib/hooks/actions/song/use-load-song-url";
import { usePlayNext } from "@/lib/hooks/player/use-play-next";
import { usePlayer } from "@/lib/hooks/player/use-player";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Howl } from "howler"
import { usePlayPrev } from "./use-play-prev";

export const useAudio = () => {
  const [position, setPosition] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);
  const [howlInstance, setHowlInstance] = useState<Howl | null>(null);
  const { playerState } = usePlayer();
  const { song } = useGetSongById(playerState.activeId!);
  const { onPlayNext } = usePlayNext();
  const { onPlayPrev } = usePlayPrev();
  const { toast } = useToast()
  const { data: url } = useLoadSongUrl(song!);
  const songUrl = url?.song.publicUrl

  useEffect(() => {
    if (url && songUrl) {
      const newHowl = new Howl({
        src: songUrl,
        autoplay: true,
        format: ["mp3"],
        html5: true,
        onplay: () => {
          if (!playing) {
            setPlaying(true)
          }
        },
        onpause: () => {
          if (playing) {
            setPlaying(false)
          }
        },
        onend: () => {
          onPlayNext()
        },
        onloaderror: (id, error) => {
          toast({
            title: "Что-то пошло не так. Попробуйте позже!",
            variant: "red"
          })
        },
        onload: () => {

        }
      });
      
      setHowlInstance(newHowl)
      console.log(songUrl)
      console.log("holwref", howlInstance)
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

  const handleSliderChange = useMemo(() => (value: number) => {
    if (howlInstance) {
      howlInstance.seek(value);
      setPosition(value);
    }
  }, [howlInstance])

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
    howlInstance, // экземпляр трека
    setPlaying, // установить состояние трека
    playing, // если трек играет
    song, // экземпляр активного трека
    onPlayNext, // следующий трек
    onPlayPrev, // предыдущий трек 
    position,
    setPosition,
    handleTogglePlay,
    duration,
    handleSliderChange,
    setDuration
  }
}