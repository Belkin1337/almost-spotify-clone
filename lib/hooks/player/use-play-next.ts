import { useCallback, useMemo } from "react";
import { usePlayer } from "../player/use-player";
import { createClient } from "@/lib/utils/supabase/client";
import { useUser } from "../actions/user/auth/use-user";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { getFollowedSongs } from "@/lib/queries/get-followed-songs";
import { SongEntity } from "@/types/entities/song";

const supabase = createClient();

export const usePlayNext = () => {
  const { playerState, setActiveId } = usePlayer();
  const { data: user } = useUser();
  const { data: followedSongs, isFetching } = useQuery<SongEntity[]>(
    getFollowedSongs(supabase, user?.id!), {
      enabled: !!user,
      refetchOnWindowFocus: false,
    }
  );

  const followedRandSongIds = useMemo(
    () => followedSongs?.map((song) => song.id) || [],
    [followedSongs]
  );

  const onPlayNext = useCallback(() => {
    if (!followedSongs || !followedRandSongIds.length) {
      return;
    }

    if (!playerState.ids || !playerState.ids.length) {
      if (followedSongs.length) {
        const randomIndex = Math.floor(
          Math.random() * followedRandSongIds.length
        );
        const nextSongId = followedRandSongIds[randomIndex];
        setActiveId(nextSongId, followedSongs);
      } else {
        return;
      }
    } else {
      const currentIndex = playerState.ids.findIndex(
        (song) => song.id === playerState.activeId
      );

      const nextIndex = currentIndex + 1;

      if (nextIndex < playerState.ids.length) {
        const nextSongId = playerState.ids[nextIndex].id;
        setActiveId(nextSongId, playerState.ids);
      } else {
        const randomIndex = Math.floor(
          Math.random() * followedRandSongIds.length
        );
        const nextSongId = followedRandSongIds[randomIndex];
        setActiveId(nextSongId, followedSongs);
      }
    }
  }, [playerState.activeId, playerState.ids, setActiveId, followedRandSongIds, followedSongs]);

  return {
    onPlayNext,
  };
};
