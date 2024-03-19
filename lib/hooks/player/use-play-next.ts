import { usePlayer } from "../player/use-player";
import { createClient } from "@/lib/utils/supabase/client";
import { useUser } from "../actions/user/auth/use-user";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { getFollowedSongs } from "@/lib/queries/get-followed-songs";
import { FollowedSongs } from "@/types/entities/playlist";

const supabase = createClient();

export const usePlayNext = () => {
  const { playerState, setActiveId } = usePlayer();
  const { data: user } = useUser();
  const { data: followedSongs } = useQuery(getFollowedSongs(
    supabase, 
    user?.id!
  ), {
      enabled: !!user,
      refetchOnWindowFocus: false,
    }
  );

  const followedSongsRandArray = followedSongs?.map(item => item) as FollowedSongs[];

  const onPlayNext = () => {
    if (!followedSongs || !followedSongsRandArray) {
      return;
    }
  
    if (!playerState.ids || !playerState.ids.length) {
      if (followedSongs.length) {
        const randomIndex = Math.floor(
          Math.random() * followedSongsRandArray.length
        );
  
        const nextSong = followedSongsRandArray[randomIndex]?.songs[0];
        if (nextSong) {
          setActiveId(nextSong, [nextSong]);
        } else {
          return;
        }
      } else {
        return;
      }
    } else {
      const currentIndex = playerState.ids.findIndex(
        (song) => song === playerState.active
      );
  
      const nextIndex = currentIndex + 1;
  
      if (nextIndex < playerState.ids.length) {
        const nextSong = playerState.ids[nextIndex];
        setActiveId(nextSong, [nextSong]);
      } else {
        const randomIndex = Math.floor(
          Math.random() * followedSongsRandArray.length
        );
  
        const nextSong = followedSongsRandArray[randomIndex]?.songs[0];
        
        if (nextSong) {
          setActiveId(nextSong, [nextSong]);
        } else {
          return;
        }
      }
    }
  };

  return {
    onPlayNext,
  };
};
