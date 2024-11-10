import { useCallback } from "react";
import { usePlayerStateQuery } from "@/lib/query/player/player-state-query";
import { useSetSongAttributes } from "@/lib/hooks/player/use-set-song-attributes";
import { usePlayer } from "@/components/player/hooks/use-player";
import { useQueryClient } from "@tanstack/react-query"
import { UserEntity } from "@/types/user";
import { USER_QUERY_KEY } from "@/lib/query/user/user-query";

export const usePlayPrev = () => {
  const { playerAttributes } = usePlayerStateQuery();
  const qc = useQueryClient();
  const user = qc.getQueryData<UserEntity>(USER_QUERY_KEY)
  const { setNewSongAttributes  } = useSetSongAttributes()
  const {setPlayerAttributes} = usePlayer()

  const currentSong = playerAttributes.active;
  const currentSongArray = playerAttributes.ids!;

  const onPlayPrev = useCallback(async () => {
    if (user) {
      if (currentSong) {
        const currentIdx = currentSongArray
          .findIndex(song => song.id === currentSong.id);

        console.log(currentIdx)
        if (currentIdx !== -1) {
          const prevIdx = (currentIdx - 1) % currentSongArray.length;
          const prevSong = currentSongArray[prevIdx];

          if (currentSong !== prevSong) {
            await setNewSongAttributes({
              nextSong: prevSong,
              nextSongArray: currentSongArray
            })
          } else {
            console.log("currentIndex", currentSong, prevSong)
            return;
          }
        } else {
          console.log("currentIndex", currentSong)
          setPlayerAttributes.mutate({
            isPlaying: false
          })
        }
      }
    }
  }, [setNewSongAttributes, currentSong, currentSongArray])

  return { onPlayPrev, };
};