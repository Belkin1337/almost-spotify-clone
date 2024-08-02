import { album_route, song_route } from "@/lib/constants/routes/routes"
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import { Skeleton } from "@/ui/skeleton";
import { ISongTitle, songTitleVariants } from "@/components/song/child/song-title/types/song-title-types";
import { useQueryClient } from "@tanstack/react-query"
import { AlbumBySong } from "@/types/album";
import { albumBySongQueryKey } from "@/lib/querykeys/album";

export const SongItemTitle = ({
  song,
  variant,
  type,
  className,
  player,
  decoration,
  isLoading
}: ISongTitle) => {
  const queryClient = useQueryClient();

  const { push } = useRouter();

  const album = queryClient.getQueryData<AlbumBySong>(
    albumBySongQueryKey(song.id)
  )

  const targetToTrack = useCallback(() => {
    if (player && song) {
      if (album?.albums?.length! > 0) {
        push(album_route(album?.albums[0].id!))
      }

      return push(song_route(song?.id))
    }

    if (type === 'link' && song) {
      push(song_route(song.id));
    }
  }, [push, song, player, album, type])

  if (!song || isLoading) return <Skeleton className="h-[22px] w-[128px] bg-neutral-700 rounded-md" />;

  return (
    <p
      onClick={targetToTrack}
      className={songTitleVariants(({ variant, className, decoration, type }))}
    >
      {song.title}
    </p>
  )
}