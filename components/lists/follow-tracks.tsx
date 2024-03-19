"use client"

import { useScopedI18n } from "@/locales/client";
import { SongItem } from "../song/song-item";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { createClient } from "@/lib/utils/supabase/client";
import { getFollowedSongs } from "@/lib/queries/get-followed-songs";
import { SongListTableHead } from "@/ui/song-list-table-head";
import { FollowedSongs } from "@/types/entities/playlist";
// import { IoCheckmarkCircle } from "react-icons/io5";
// import { UserTips } from "../tooltip/action";
// import { LuPlusCircle } from "react-icons/lu";
import { FaPlay } from "react-icons/fa";
import { Button } from "@/ui/button";

const supabase = createClient();

export const FollowTracksList = ({
  userid
}: {
  userid: string
}) => {
  const { data: followedSongs } = useQuery<FollowedSongs[]>(getFollowedSongs(supabase, userid), {
    enabled: !!userid,
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

  const updatedFollowedSongs = followedSongs.map(item => ({
    ...item,
    songs: {
      ...item.songs,
      created_at_by_list: item.created_at
    }
  }));

  const allSongs = updatedFollowedSongs.flatMap(item => item.songs);

  return (
    <>
      <div className="flex items-center gap-x-8 px-6 py-4">
        <Button
          variant="page_play"
          size="lg"
          rounded="large"
        >
          <FaPlay className="text-black" />
        </Button>
        <div className="flex items-center gap-x-2">

        </div>
      </div>
      <SongListTableHead />
      <div className="flex flex-col gap-y-2 w-full p-6">
        {allSongs.map((song, idx) => (
          <div key={idx} className="flex items-center w-full">
            <div className="flex-1">
              <SongItem
                follow
                list={{
                  created_at: song.created_at_by_list!,
                  data: allSongs,
                  id: String(idx + 1)
                }}
                song={song}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}