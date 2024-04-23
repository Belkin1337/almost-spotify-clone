import { SkeletonArtistName } from "@/components/skeletons/song/skeleton-song-artist"
import { SkeletonSongImage } from "@/components/skeletons/song/skeleton-song-image"
import { artist_route_profile } from "@/lib/constants/routes/routes"
import { useLoadImage } from "@/lib/hooks/image/use-load-image"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useCallback } from "react"
import { FaCircle } from "react-icons/fa"
import { albumArtistVariants, IAlbumArtist } from "@/components/album/child/album-artist/types/album-artist-types";
import { useAlbumArtistsQuery } from "@/lib/query/album/album-artists-query";
import { nullAvatarImage } from "@/lib/constants/files/invalid-or-null-images";

export const AlbumArtist = ({
  variant,
  className,
  album,
}: IAlbumArtist) => {
  const { data: artists, isFetching } = useAlbumArtistsQuery(album.id);
  const { push } = useRouter();

  // avatar of the first artist
  const { data: image } = useLoadImage(artists ? artists[0]?.avatar_path || nullAvatarImage : '')

  const targetToAuthor = useCallback((id: string) => {
    if (id) {
      push(`${artist_route_profile}/${id}`)
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
              src={image?.url as string}
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
              <p key={artist.id} onClick={() => targetToAuthor(artist.id)} className={albumArtistVariants(({ variant, className }))}>
                {artist.name}
                {(idx !== artists.length - 1 && variant !== 'page') && (
                  <span>,</span>
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