"use client"

import { artist_route } from "@/lib/constants/routes"
import { useLoadImage } from "@/lib/hooks/image/use-load-image"
import { VariantProps, cva } from "class-variance-authority"
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import { getArtistsById } from "@/lib/queries/get-artists-by-id"
import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/lib/utils/supabase/client"
import { SongEntity } from "@/types/entities/song"
import Image from "next/image"

const songAuthorVariants = cva("text-neutral-400 truncate", {
  variants: {
    variant: {
      default: "text-sm",
      player: "hover:underline hover:cursor-pointer text-sm",
      widget: "hover:underline text-lg cursor-pointer font-medium",
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
  player?: boolean,
  page?: boolean,
  song: SongEntity
}

const supabase = createClient();

export const SongArtist = ({
  variant,
  className,
  player,
  page,
  song
}: SongAuthorProps) => {
  const { data: artists } = useQuery({
    queryKey: ['artists', song?.artists],
    queryFn: () => getArtistsById(supabase, song?.artists),
    enabled: !!song?.artists,
    retry: song?.artists?.length || 2
  })

  const { push } = useRouter();

  const avatarUrl = useLoadImage((artists && artists[0]?.avatar_url) || '/images/liked.png')

  const targetToAuthor = useCallback((id: string) => {
    if ((player || page) && id) {
      push(`${artist_route}/${id}`)
    }
  }, [push, player, page])

  return (
    artists?.map((artist) => (
      <>
        {variant === 'page' && (
          <div className="rounded-full overflow-hidden w-[26px] h-[26px]">
            <Image
              src={`${avatarUrl || '/images/liked.png'}`}
              alt={artist.name}
              title={artist.name}
              width={40}
              height={40}
              loading="lazy"
            />
          </div>
        )}
        <p
          key={artist.id}
          onClick={() => targetToAuthor(artist.id)}
          className={songAuthorVariants(({
            variant,
            className
          }))}
        >
          {artist.name}
        </p>
      </>
    ))
  )
}