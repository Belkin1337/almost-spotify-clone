"use client"

import { UserCard } from "@/components/user/components/card/components/user-followed-card"
import Image from "next/image"
import { Typography } from "@/ui/typography";
import { useScopedI18n } from "@/locales/client";
import { useFollowedSongsQuery } from "@/lib/query/user/followed-songs-query";

export const LikedSongsPreview = ({
  userId
}: {
  userId: string
}) => {
  const { data: followedSongs, isError } = useFollowedSongsQuery(userId);
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
          <UserCard variant="miniauture" followed_songs_length={followedSongs.songs?.length}/>
        </div>
      </div>
    </div>
  )
}