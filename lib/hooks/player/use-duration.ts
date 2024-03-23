"use client"

import { SongEntity } from "@/types/entities/song";
import { useLoadSongUrl } from "../actions/song/use-load-song-url";
import { useEffect, useState } from "react";
import { durationConverter } from "@/lib/tools/duration-converter";

export function useDuration(song: SongEntity) {
  const [duration, setDuration] = useState<number>(0);

  const { data: url } = useLoadSongUrl(song!);
  const songUrl = url?.song.publicUrl;

  useEffect(() => {
    const howl = new Howl({
      src: songUrl!,
      format: ["mp3"],
      onload: () => {
        setDuration(howl.duration());
      },
    });
  }, [songUrl]);

  const raw = duration;
  const formatted = durationConverter(duration);

  return {
    raw,
    formatted
  }
}