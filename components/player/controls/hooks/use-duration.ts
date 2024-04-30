"use client"

import { durationConverter } from "@/lib/tools/duration-converter";
import { usePlayerStateQuery } from "@/lib/query/player/player-state-query";

export function useDuration() {
  const { playerAttributes } = usePlayerStateQuery()

  const raw = playerAttributes.duration || 0;
  const formatted = durationConverter(raw);

  return { raw, formatted }
}