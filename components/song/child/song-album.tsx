"use client"

import { Typography } from "@/ui/typography"

export const SongAlbum = ({ album }: { album: string }) => {
  return (
    <Typography variant="secondary" size="sm">
      {album}
    </Typography>
  )
}