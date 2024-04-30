import { album_route, song_route } from "@/lib/constants/routes/routes"
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import { useAlbumBySong } from "@/lib/query/album/album-by-song";
import { Skeleton } from "@/ui/skeleton";
import { ISongTitle, songTitleVariants } from "@/components/song/child/song-title/types/song-title-types";

export const SongItemTitle = ({
  song,
  variant,
  className,
  player,
  isLoading
}: ISongTitle) => {
  const { push } = useRouter();
  const { data: album } = useAlbumBySong(song.id);

  const targetToTrack = useCallback(() => {
    if (player && song) {
      if (album?.length! > 0) {
        push(album_route(album![0].id))
      } else push(song_route(song?.id))
    }
  }, [push, song, player, album])

  if (isLoading) {
    return (
      <Skeleton className="h-[22px] w-[128px] bg-neutral-700 rounded-md" />
    )
  }

  return (
    <p onClick={targetToTrack} className={songTitleVariants(({ variant, className }))}>
      {song?.title}
    </p>
  )
}