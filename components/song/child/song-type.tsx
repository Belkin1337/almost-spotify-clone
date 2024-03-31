"use client"

import { Typography } from "@/ui/typography"
import { SONG_TYPE_SINGLE, SONG_TYPE_ALBUM } from "@/lib/constants/preview"

export const SongType = ({ 
  type 
}: { 
  type: typeof SONG_TYPE_SINGLE | typeof SONG_TYPE_ALBUM
}) => {
  return (
    <Typography size="md">
      {type}
    </Typography>
  )
}