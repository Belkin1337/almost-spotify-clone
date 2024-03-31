"use client"

import { ArtistCard } from "@/components/artist/card/artist-card";
import { ArtistList, ArtistListType } from "@/components/artist/list/artist-list";
import { search_route } from "@/lib/constants/routes";
import { getArtistsAll } from "@/lib/queries/artist/get-artists-all"
import { createClient } from "@/lib/utils/supabase/client"
import { ArtistEntity } from "@/types/entities/artist";
import { Typography } from "@/ui/typography"
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { useRouter } from "next/navigation";

const supabase = createClient();

export const SearchArtistList = ({
  type 
}: {
  type: ArtistListType
}) => {
  const { push } = useRouter();

  const { data: artists } = useQuery<ArtistEntity[]>(getArtistsAll(supabase))

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