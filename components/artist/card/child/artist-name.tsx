import { artist_route } from "@/lib/constants/routes";
import { ArtistEntity } from "@/types/entities/artist";
import { Typography } from "@/ui/typography";
import { cva, VariantProps } from "class-variance-authority";
import { useRouter } from "next/navigation"
import React, { useCallback } from "react";

const artistNameVariants = cva("", {
  variants: {
    variant: {
      default: "hover:underline text-md cursor-pointer text-white !font-bold truncate",
      page: "text-white !font-extrabold text-[82px]",
      select: ""
    }
  },
  defaultVariants: {
    variant: "default"
  }
})

interface ArtistNameProps 
  extends React.HTMLAttributes<HTMLParagraphElement>,
  VariantProps<typeof artistNameVariants> {
    artist: ArtistEntity
  }

export const ArtistName = ({ 
  variant,
  className,
  artist,
  ...props
}: ArtistNameProps) => {
  const { push } = useRouter();

  const handleRouteToArtist = useCallback(() => {
    if (variant !== 'select') {
      push(`${artist_route}/${artist?.id}`)
    }
  }, [push, variant, artist?.id])

  return (
    <Typography
      onClick={handleRouteToArtist}
      className={artistNameVariants(({ variant, className }))}
      {...props}
    >
      {artist?.name}
    </Typography>
  )
}