"use client"

import { album_route } from "@/lib/constants/routes"
import { Typography } from "@/ui/typography"
import Link from "next/link"

export const SongAlbum = ({
  album
}: {
  album: string
}) => {
  return (
    <Link href={`${album_route}/${album}`}>
      <Typography
        variant="secondary"
        size="sm"
        className="truncate hover:underline hover:text-neutral-200"
      >
        {album}
      </Typography>
    </Link>
  )
}