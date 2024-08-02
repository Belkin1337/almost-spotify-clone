"use client"

import { Typography } from "@/ui/typography"
import { ArtistListType } from "@/components/artist/components/list/types/artist-list-types";

export const SearchRecentArtistsList = ({
  type 
}: {
  type: ArtistListType
}) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Typography size="xl" font="bold">
          Recent searches
        </Typography>
        <Typography
          className="text-sm !text-neutral-400 hover:underline cursor-pointer"
        >
          Показать все
        </Typography>
      </div>
    </>
  )
}