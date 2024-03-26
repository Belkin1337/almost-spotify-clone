"use client"

import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { createClient } from "@/lib/utils/supabase/client";
import { getFollowedSongs } from "@/lib/queries/get-followed-songs";
import { FollowedSongs } from "@/types/entities/playlist";
import { FollowedPreview } from "./child/followed-preview";
import { FollowedList } from "./child/followed-list";
import { useMemo } from "react";

const supabase = createClient();

export const FollowTracksList = ({
  userId
}: {
  userId: string
}) => {
  const { data: followedSongs } = useQuery<FollowedSongs[]>(getFollowedSongs(supabase, userId), {
    enabled: !!userId,
  })

  const updateFollowedSongsList = useMemo(() => {
    if (followedSongs) {
      return followedSongs.map(item => ({
        ...item,
        songs: {
          ...item.songs,
          created_at_by_list: item.created_at
        }
      }));
    }

    return [];
  }, [followedSongs])

  const allSongs = useMemo(() => {
    return updateFollowedSongsList.flatMap(item => item.songs);
  }, [updateFollowedSongsList]);

  return (
    <>
      <div className="absolute bg-gradient-to-b from-violet-700/90 w-full top-0 right-0 left-0 to-transparent h-[600px]" />
      <FollowedPreview
        listLength={followedSongs?.length || 0}
      />
      <FollowedList
        list={allSongs}
      />
    </>
  )
}