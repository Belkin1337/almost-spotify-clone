"use client"

import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { createClient } from "@/lib/utils/supabase/client";
import { getFollowedSongs } from "@/lib/queries/song/followed/get-followed-songs";
import { FollowedSongs } from "@/types/entities/playlist";
import { FollowedPreview } from "./child/followed-preview";
import { FollowedList } from "./child/followed-list";
import { useMemo } from "react";
import { Wrapper } from "@/ui/wrapper";
import { ColoredBackground } from "@/ui/colored-background";

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
    <Wrapper variant="page">
      <ColoredBackground />
      <FollowedPreview listLength={followedSongs?.length || 0} />
      <FollowedList list={allSongs} />
    </Wrapper>
  )
}