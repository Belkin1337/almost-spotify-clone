"use client"

import { Typography } from "@/ui/typography"

export const SongDuration = ({ 
  duration 
}: {
  duration: string 
}) => {
  return (
    <Typography variant="secondary" font="normal" size="sm">
      {duration}
    </Typography>
  )
}