"use client"

import { useScopedI18n } from "@/locales/client";
import { TbPlaylist } from "react-icons/tb";
import { getSongsByUserId } from "@/lib/queries/get-songs-by-userId";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { createClient } from "@/lib/utils/supabase/client";
import { SongItem } from "../../song/song-item";
import { Typography } from "@/ui/typography";
import { User } from "@supabase/supabase-js";
import { SongEntity } from "@/types/entities/song";
import { FollowTrackRouteButton } from "../../static/button/follow-tracks";

const supabase = createClient();

export const Library = ({
  user
}: {
  user: User
}) => {
  const { data: songs } = useQuery<SongEntity[]>(getSongsByUserId(supabase, user?.id), {
    enabled: !!user.id
  });

  const libraryLocale = useScopedI18n('main-service.sidebar.widgets')

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex px-2 items-center gap-x-2">
          <TbPlaylist
            className="text-neutral-400"
            size={26}
          />
          <Typography variant="secondary">
            {libraryLocale('media-library')}
          </Typography>
        </div>
      </div>
      <div className="flex flex-col gap-y-2 mt-4 overflow-x-hidden">
        <FollowTrackRouteButton />
        {songs?.map((song) => (
          <SongItem
            key={song.id}
            variant="library"
            library
            song={song}
            list={{
              data: songs
            }}
          />
        ))}
      </div>
    </>
  );
}