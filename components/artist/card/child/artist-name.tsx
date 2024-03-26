import { artist_route } from "@/lib/constants/routes";
import { ArtistEntity } from "@/types/entities/artist";
import { Typography } from "@/ui/typography";
import { cva, VariantProps } from "class-variance-authority";
import { useRouter } from "next/navigation"
import React from "react";

const artistNameVariants = cva("", {
  variants: {
    variant: {
      default: "hover:underline text-md cursor-pointer text-white !font-bold truncate",
      page: "text-white !font-extrabold text-[82px]"
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

  return (
    <Typography
      onClick={() => push(`${artist_route}/${artist?.id}`)}
      className={artistNameVariants(({ variant, className }))}
      {...props}
    >
      {artist?.name}
    </Typography>
  )
}