"use client"

import { ArtistList } from "@/components/artist/list/components/artist-list";
import { search_route } from "@/lib/constants/routes/routes";
import { Typography } from "@/ui/typography"
import { useRouter } from "next/navigation";
import { useAllArtistsList } from "@/lib/query/artist/artists-list-query";
import { ArtistListType } from "@/components/artist/list/types/artist-list-types";

export const SearchArtistList = ({
  type 
}: {
  type: ArtistListType
}) => {
  const { push } = useRouter();
  const { data: artists } = useAllArtistsList()

  if (!artists) return (<Typography>Артистов не найдено.</Typography>);

  return (
    <>
      <div className="flex items-center justify-between">
        <Typography className="text-3xl !font-bold">
          Артисты
        </Typography>
        <Typography
          onClick={() => push(`${search_route}/all-artists`)}
          className="text-sm !text-neutral-400 hover:underline cursor-pointer"
        >
          Показать все
        </Typography>
      </div>
      <ArtistList type={type} />
    </>
  )
}