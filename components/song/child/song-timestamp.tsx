"use client"

import { Typography } from "@/ui/typography"

export const SongTimestamp = ({ date }: { date: string }) => {
  return (
    <Typography variant="secondary" font="normal" size="sm">
      {date}
    </Typography>
  )
}