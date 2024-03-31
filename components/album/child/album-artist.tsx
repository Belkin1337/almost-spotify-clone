import { SkeletonArtistName } from "@/components/skeletons/song/skeleton-song-artist"
import { SkeletonSongImage } from "@/components/skeletons/song/skeleton-song-image"
import { album_route } from "@/lib/constants/routes"
import { useLoadImage } from "@/lib/hooks/image/use-load-image"
import { getArtistsById } from "@/lib/queries/artist/get-artists-by-id"
import { createClient } from "@/lib/utils/supabase/client"
import { AlbumEntity } from "@/types/entities/album"
import { useQuery } from "@tanstack/react-query"
import { cva, VariantProps } from "class-variance-authority"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useCallback } from "react"
import { FaCircle } from "react-icons/fa"

const albumArtistVariants = cva("text-neutral-400 truncate", {
  variants: {
    variant: {
      default: "text-sm",
      player: "hover:underline hover:cursor-pointer text-sm",
      widget: "hover:underline text-lg cursor-pointer font-medium",
      widget_title: "text-white font-bold hover:underline hover:cursor-pointer",
      album: "text-white text-xl font-bold hover:underline hover:cursor-pointer",
      page: "hover:underline hover:cursor-pointer text-sm"
    }
  },
  defaultVariants: {
    variant: "default"
  }
})

interface AlbumArtistProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
  VariantProps<typeof albumArtistVariants> {
  album: AlbumEntity
}

const supabase = createClient();

export const AlbumArtist = ({
  variant,
  className,
  album,
}: AlbumArtistProps) => {
  const { data: artists, isFetching } = useQuery({
    queryKey: ['artists', album?.artists],
    queryFn: () => getArtistsById(supabase, album?.artists),
    enabled: !!album?.artists,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  })

  const { push } = useRouter();

  // avatar of the first artist
  const avatarUrl = useLoadImage((artists && artists[0]?.avatar_url) || '/images/liked.png')

  const targetToAuthor = useCallback((id: string) => {
    if (id) {
      push(`${album_route}/${id}`)
    }
  }, [push])

  if (!album) return;

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
          <SkeletonArtistName />
        ) : (
          artists?.map((artist, idx) => (
            <React.Fragment key={artist.id}>
              <p
                key={artist.id}
                onClick={() => targetToAuthor(artist.id)}
                className={albumArtistVariants(({
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