"use client"

import { useEffect } from "react"
import { useUser } from "@/hooks/use-user";
import { Song } from "@/types";
import { useRouter } from "next/navigation";
import LibrarySongItem from "@/components/ui/song/library-song-item";
import { LikeButton } from "@/components/ui/song/like-button";
import useOnPlay from "@/hooks/use-on-play";
import { useScopedI18n } from "@/locales/client";

interface LikedContentProps {
  songs: Song[];
}

export const LikedContent = ({ songs }: LikedContentProps) => {
  const router = useRouter();
  const { isLoading, user } = useUser();
  const onPlay = useOnPlay(songs); 
  const likedLocale = useScopedI18n('main-service.pages.liked-content')
  const configLocale = useScopedI18n('main-service.main-part.config')

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  return (
    songs.length === 0 ? (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        {likedLocale('navbar.is-not-liked-songs')}
      </div>
    ) : (
      <>
        <div className="w-full h-[44px] p-6">
          <div className="flex flex-row items-center gap-y-2">
            <p className="text-neutral-400 text-[0.9rem] font-medium pl-2">{configLocale('song-attributes.song-name')}</p>
          </div>
          <hr className="border border-neutral-600 w-full h-[1px]" />
        </div>
        <div className="flex flex-col gap-y-2 w-full p-6">
          {songs.map((song) => (
            <div key={song.id} className="flex items-center w-full">
              <div className="flex-1">
                <LibrarySongItem onClick={(id: string) => onPlay(id)} data={song} />
              </div>
              <div className="pl-2 pr-4">
                <LikeButton songId={song.id} />
              </div>
            </div>
          ))}
        </div>
      </>
    )
  );
}
