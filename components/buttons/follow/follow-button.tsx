import React, { useState, useEffect, useCallback } from "react"
import { createClient } from "@/lib/utils/supabase/client";
import { useUser } from "@/lib/hooks/actions/user/auth/use-user";
import { useFollowSong } from "@/lib/hooks/actions/song/use-follow-track";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { useDeleteFollowSong } from "@/lib/hooks/actions/song/use-delete-follow-song";
import { LuPlusCircle } from "react-icons/lu";
import { IoCheckmarkCircle } from "react-icons/io5";
import { getFollowSong } from "@/lib/queries/get-follow-song";
import { VariantProps, cva } from "class-variance-authority";
import { UserTips } from "@/components/tooltip/action";

export interface LikeButtonProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof followButtonVariants> {
  songId: string,
}

const followButtonVariants = cva("hover:opacity-75 transition cursor-pointer justify-self-end", {
  variants: {
    variant: {
      default: ""
    }
  },
  defaultVariants: {
    variant: "default"
  }
})

export const FollowTrackButton = ({ songId, className, variant }: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const supabase = createClient()
  const { data: user } = useUser()
  const { data: song } = useQuery(getFollowSong(supabase, songId, user?.id!), {
    enabled: !!user,
  });
  const addFollowSong = useFollowSong(songId)
  const deleteFollowSong = useDeleteFollowSong(songId)

  useEffect(() => {
    if (song?.song_id) {
      setIsLiked(true);
    } else if (!song?.sond_id) {
      setIsLiked(false);
    }
  }, [song, setIsLiked]);

  const handleLike = useCallback(() => {
    try {
      if (isLiked) {
        setIsLiked(false)
        deleteFollowSong.mutateAsync()
      } else {
        setIsLiked(true)
        addFollowSong.mutateAsync()
      }
    } catch (error) {
      console.log(error)
    }
  }, [setIsLiked, addFollowSong, deleteFollowSong, isLiked])

  return (
    <div onClick={handleLike} className={followButtonVariants(({
      variant,
      className
    }))}>
      {isLiked ? (
        <UserTips action="Удалить из любимых треков">
          <IoCheckmarkCircle size={22} className="text-jade-400 " />
        </UserTips>
      ) : (
        <UserTips action="Добавить в любимые треки">
          <LuPlusCircle size={22} />
        </UserTips>
      )}
    </div>
  );
}