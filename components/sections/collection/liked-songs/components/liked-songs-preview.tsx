"use client"

import { UserCollectionCard } from "@/components/user/components/card/components/user-collection-card"
import Image from "next/image"
import { Typography } from "@/ui/typography";
import { useScopedI18n } from "@/locales/client";
import { useFollowedSongsQuery } from "@/lib/query/user/followed-songs-query";
import { USER_QUERY_KEY } from "@/lib/query/user/user-query";
import { useQueryClient } from "@tanstack/react-query"
import { UserEntity } from "@/types/user";

export const LikedSongsPreview = () => {
  const qc = useQueryClient()
  const user = qc.getQueryData<UserEntity>(USER_QUERY_KEY)
  if (!user) return null;
  
  const { data: followedSongs, isError } = useFollowedSongsQuery(user.id);
  const likedPageLocale = useScopedI18n('main-service.pages.liked-content.navbar')

  if (!followedSongs?.songs || isError) return;

  return (
    <div className="flex z-20 relative flex-col md:flex-row items-end gap-x-5 py-16 p-6">
      <div className="relative h-32 w-32 lg:h-56 lg:w-56">
        <Image
          fill
          src="/images/liked.png"
          alt="Collection/Followed"
          className="rounded-md object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-y-4 mt-4 md:mt-0">
        <Typography className="hidden md:block text-white font-semibold text-xl">
          {likedPageLocale('welcome-message')}
        </Typography>
        <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold">
          {likedPageLocale('subtitle-message')}
        </h1>
        <div className="flex items-center justify-start">
          <UserCollectionCard
            variant="miniauture"
            followed_songs_length={followedSongs.songs?.length}
          />
        </div>
      </div>
    </div>
  )
}