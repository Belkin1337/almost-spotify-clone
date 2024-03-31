"use client"

import React, { useCallback } from "react"
import { artist_route } from "@/lib/constants/routes"
import { useLoadImage } from "@/lib/hooks/image/use-load-image"
import { VariantProps, cva } from "class-variance-authority"
import { useRouter } from "next/navigation"
import { getArtistsById } from "@/lib/queries/artist/get-artists-by-id"
import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/lib/utils/supabase/client"
import { SongEntity } from "@/types/entities/song"
import { FaCircle } from "react-icons/fa"
import { SkeletonArtistName } from "@/components/skeletons/song/skeleton-song-artist"
import { SkeletonSongImage } from "@/components/skeletons/song/skeleton-song-image"
import Image from "next/image"

const songAuthorVariants = cva("text-neutral-400 truncate", {
  variants: {
    variant: {
      default: "text-sm",
      player: "hover:underline hover:cursor-pointer text-sm",
      widget: "hover:underline text-lg cursor-pointer font-medium",
      widget_title: "text-white !font-bold hover:underline hover:cursor-pointer",
      page: "hover:underline hover:cursor-pointer text-sm"
    }
  },
  defaultVariants: {
    variant: "default"
  }
})

interface SongAuthorProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
  VariantProps<typeof songAuthorVariants> {
  song: SongEntity
}

const supabase = createClient();

export const SongArtist = ({
  variant,
  className,
  song
}: SongAuthorProps) => {
  const { data: artists, isFetching } = useQuery({
    queryKey: [song?.artists],
    queryFn: () => getArtistsById(supabase, song?.artists),
    enabled: !!song?.artists,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  })

  const { push } = useRouter();

  // avatar of the first artist
  const avatarUrl = useLoadImage((artists && artists[0]?.avatar_url) || '/images/liked.png')

  const targetToAuthor = useCallback((id: string) => {
    if (id) {
      push(`${artist_route}/${id}`)
    }
  }, [push])

  if (!artists) return;

  return (
    <>
      {variant === 'page' && (
        <div className="rounded-full overflow-hidden w-[26px] h-[26px]">
          {isFetching ? (
            <SkeletonSongImage />
          ) : (
            <Image
              src={`${avatarUrl || '/images/liked.png'}`}
              alt={artists ? artists[0].name : ''}
              title={artists && artists[0].name}
              width={40}
              height={40}
              loading="lazy"
            />
          )}
        </div>
      )}
      <div className="flex items-center gap-1">
        {isFetching ? (
          <SkeletonArtistName/>
        ) : (
          artists?.map((artist, idx) => (
            <React.Fragment key={artist.id}>
              <p
                key={artist.id}
                onClick={() => targetToAuthor(artist.id)}
                className={songAuthorVariants(({
                  variant,
                  className
                }))}
              >
                {artist.name}
                {(idx !== artists.length - 1 && variant !== 'page') && (
                  <span className="text-neutral-400">,</span>
                )}
              </p>
              {variant === 'page' && (
                <FaCircle size={4} className="fill-white" />
              )}
            </React.Fragment>
          ))
        )}
      </div>
    </>
  )
}