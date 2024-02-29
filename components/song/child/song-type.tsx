"use client"

import { Typography } from "@/ui/typography"

export const SongType = ({ type }: { type: string }) => {
  return (
    <Typography size="md">
      {type}
    </Typography>
  )
}