"use client"

import { MouseEvent, useCallback } from "react"
import { useSongFollow } from "@/components/song/child/song-follow-button/hooks/use-song-follow";
import { UserTips } from "@/components/tooltip/components/action";
import { Button } from "@/ui/button";
import { LuPlusIcon } from "@/ui/icons/plus-icon";
import { CheckmarkCircleIcon } from "@/ui/icons/checkmark-circle";
import { IFollowButton } from "@/components/song/child/song-follow-button/types/song-follow-button-types";

export const SongFollowButton = ({
  songId,
  variant
}: IFollowButton) => {
  const { followedSong, followMutation } = useSongFollow(songId);

  const handleLike = useCallback(async (
    e: MouseEvent<HTMLButtonElement>
  ) => {
		e.stopPropagation();
    await followMutation.mutateAsync();
  }, [followMutation])

  return (
    <Button
      disabled={followMutation.isPending}
      onClick={handleLike}
			align="centered"
      className="hover:scale-[1.04]"
    >
      {followedSong?.song_id === songId ? (
        <UserTips action="Удалить из любимых треков">
          <CheckmarkCircleIcon page={variant?.page}/>
        </UserTips>
      ) : (
        <UserTips action="Добавить в любимые треки">
					<LuPlusIcon page={variant?.page}/>
        </UserTips>
      )}
    </Button>
  );
}