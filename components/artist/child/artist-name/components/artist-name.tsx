import { artist_route_profile } from "@/lib/constants/routes/routes";
import { useRouter } from "next/navigation"
import React, { MouseEvent, useCallback } from "react";
import { artistNameVariants, IArtistName } from "@/components/artist/child/artist-name/types/artist-name-types";

export const ArtistName = ({ 
  variant, className, artistId, artistName, type
}: IArtistName) => {
  const { push } = useRouter();

  const handleRouteToArtist = useCallback((e: MouseEvent<HTMLParagraphElement>) => {
    if (variant !== 'select') {
      e.stopPropagation();
      push(artist_route_profile(artistId))
    }
  }, [push, variant, artistId])

  if (!artistName) return;
  
  return (
    <p onClick={handleRouteToArtist} className={artistNameVariants(({ variant, type, className }))}>
      {artistName}
    </p>
  )
}