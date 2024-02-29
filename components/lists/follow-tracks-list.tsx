"use client"

import { useScopedI18n } from "@/locales/client";
import { SongItem } from "../song/song-item";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { createClient } from "@/lib/utils/supabase/client";
import { getFollowedSongs } from "@/lib/queries/get-followed-songs";
import { SongListTableHead } from "@/ui/song-list-table-head";
import { FollowedSongs } from "@/types/entities/playlist";

const supabase = createClient();

export const FollowTracksList = ({ userid }: { userid: string }) => {
  const { data: followedSongs } = useQuery<FollowedSongs[]>(getFollowedSongs(supabase, userid), {
    enabled: !!userid,
    staleTime: 1000,
  })

  const likedLocale = useScopedI18n('main-service.pages.liked-content')

  if (!followedSongs) {
    return null
  }

  if (followedSongs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        {likedLocale('navbar.is-not-liked-songs')}
      </div>
    )
  }
  
  const allSongs = followedSongs.flatMap((item) => item.songs);

  return (
    <>
      <SongListTableHead />
      <div className="flex flex-col gap-y-2 w-full p-6">
        {allSongs.map(song => (
          <div key={song.id} className="flex items-center w-full">
            <div className="flex-1">
              <SongItem
                follow
                array_data={allSongs}
                data={song}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}