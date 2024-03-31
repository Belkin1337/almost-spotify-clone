"use client"

import { ArtistImage } from "@/components/artist/card/child/artist-image";
import { EditArtistForm } from "@/components/forms/media/artist/edit/edit-artist";
import { artist_route, profile_route } from "@/lib/constants/routes";
import { useUser } from "@/lib/hooks/actions/user/auth/use-user"
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { getArtistsByUserId } from "@/lib/queries/artist/get-artists-by-user";
import { getSongsAll } from "@/lib/queries/song/get-songs-all";
import { createClient } from "@/lib/utils/supabase/client";
import { ArtistEntity } from "@/types/entities/artist";
import { SongEntity } from "@/types/entities/song";
import { Button } from "@/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/tooltip";
import { Typography } from "@/ui/typography";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const supabase = createClient();

export const UserArtistsList = () => {
  const { openDialog } = useDialog();
  const { user } = useUser();
  const { push } = useRouter();

  const { data: artists, isError: artistsError } = useQuery<ArtistEntity[]>(
    getArtistsByUserId(supabase, user?.id!), {
      enabled: !!user?.id,
      refetchOnMount: false,
      refetchOnWindowFocus: false
  })

  const { data: songs, isError: songsError } = useQuery<SongEntity[]>(getSongsAll(supabase))

  const checkSongsLengthByArtist = useCallback((artistId: string) => {
    return songs?.filter(song => song?.artists?.includes(artistId));
  }, [songs])

  if (artistsError || songsError || !user) return;

  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 auto-rows-auto w-full h-full gap-4">
      {artists?.map((artist) => (
        <div
          key={artist.id}
          className="relative flex flex-col 
        rounded-md hover:scale-[1.02] min-w-[260px] h-[310px] overflow-hidden bg-neutral-800
         border border-neutral-700"
        >
          <ArtistImage
            variant="list"
            artist={artist}
          />
          <Tooltip>
            <TooltipTrigger className="absolute top-4 right-4 bg-black/80 rounded-md flex p-2 flex-col">
              ID
            </TooltipTrigger>
            <TooltipContent>
              <Typography>
                {artist.id}
              </Typography>
            </TooltipContent>
          </Tooltip>
          <div className="flex p-2 flex-col">
            <Typography>
              Имя: {artist.name}
            </Typography>
            <Typography>
              Треков: {artist?.id && checkSongsLengthByArtist(artist.id)?.length}
            </Typography>
          </div>
          <div className="flex items-start gap-2 justify-between">
            <Button
              variant="form"
              onClick={() => openDialog({
                dialogChildren: <EditArtistForm artistId={artist.id} />
              })}
            >
              Редактировать
            </Button>
            <Button
              variant="form"
              onClick={() => push(`${artist_route}/${artist.id}`)}
            >
              На страницу
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}