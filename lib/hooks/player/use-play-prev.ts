import { useCallback, useMemo } from "react";
import { usePlayer } from "@/lib/hooks/player/use-player";
import { createClient } from "@/lib/utils/supabase/client";
import { useUser } from "../actions/user/auth/use-user";
import { getFollowedSongs } from "@/lib/queries/get-followed-songs";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { SongEntity } from "@/types/entities/song";

const supabase = createClient();

export const usePlayPrev = () => {
  const { playerState, setActiveId } = usePlayer();
  const { user } = useUser();
  const { data: followedSongs, isFetching } = useQuery<SongEntity[]>(
    getFollowedSongs(supabase, user?.id!),
    {
      enabled: !!user,
      refetchOnWindowFocus: false,
    }
  );

  const followedRandSongIds = useMemo(
    () => followedSongs?.map((song) => song) || [],
    [followedSongs]
  );

  const onPlayPrev = useCallback(() => {
    if (!followedSongs || !followedRandSongIds.length) {
      return;
    }

    if (!playerState.ids || !playerState.ids.length) {
      if (followedSongs.length) {
        const randomIndex = Math.floor(
          Math.random() * followedRandSongIds.length
        );

        const prevSongId = followedRandSongIds[randomIndex];

        setActiveId(prevSongId, followedSongs);
      } else {
        return;
      }
    } else {
      const currentIndex = playerState.ids.findIndex(
        (song) => song === playerState.active
      );

      const prevIndex = currentIndex - 1;

      if (prevIndex < playerState.ids.length) {
        const prevSongId = playerState.ids[prevIndex];

        if (prevSongId) {
          setActiveId(prevSongId, playerState.ids);
        } else {
          setActiveId(playerState.active, playerState.ids);
        }
      } else {
        const randomIndex = Math.floor(
          Math.random() * followedRandSongIds.length
        );

        const prevSongId = followedRandSongIds[randomIndex];
        setActiveId(prevSongId, followedSongs);
      }
    }
  }, [
    playerState.active,
    playerState.ids,
    setActiveId,
    followedRandSongIds,
    followedSongs,
  ]);

  return {
    onPlayPrev,
  };
};
