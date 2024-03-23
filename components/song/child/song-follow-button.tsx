"use client"

import React from "react"
import { useFollowSong } from "@/lib/hooks/actions/song/use-follow-track";
import { LuPlusCircle } from "react-icons/lu";
import { IoCheckmarkCircle } from "react-icons/io5";
import { UserTips } from "@/components/tooltip/action";

export interface FollowButtonProps {
  variant?: {
    default?: boolean,
    page: boolean
  },
  songId: string,
}

export const FollowButton = ({
  songId,
  variant
}: FollowButtonProps) => {
  const { followedSong, followMutation } = useFollowSong(songId);

  const handleLike = () => {
    followMutation.mutate();
  };

  return (
    <div
      onClick={handleLike}
      className="flex items-center justify-center hover:scale-[1.04] transition cursor-pointer"
    >
      {followedSong?.data?.song_id === songId ? (
        <UserTips action="Удалить из любимых треков">
          <IoCheckmarkCircle
            size={variant?.page ? 44 : 22}
            className="text-jade-400"
          />
        </UserTips>
      ) : (
        <UserTips action="Добавить в любимые треки">
          <LuPlusCircle
            className={`${variant?.page && "text-neutral-400"}`}
            size={variant?.page ? 44 : 22}
          />
        </UserTips>
      )}
    </div>
  );
}