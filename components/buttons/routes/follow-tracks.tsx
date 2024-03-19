import { useScopedI18n } from "@/locales/client"
import { Typography } from "@/ui/typography"
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import Image from "next/image"

export const FollowTrackRouteButton = () => {
  const { push } = useRouter();

  const likedSongButtonLocale = useScopedI18n('main-service.main-part.config')

  const pushToFollowTracks = useCallback(() => {
    push('/home/collection/tracks')
  }, [push])

  return (
    <div onClick={pushToFollowTracks}
      className="flex flex-col p-2 md:flex-row items-center gap-x-2 cursor-pointer hover:bg-neutral-800/50 rounded-md">
      <Image
        src="/images/liked.png"
        width={48}
        height={48}
        loading="lazy"
        alt="Playlist"
        className="relative rounded-md h-[48px] w-[48px] object-cover"
      />
      <div className="flex flex-col mt-4 md:mt-0">
        <Typography size="md">
          {likedSongButtonLocale('liked-tracks-widget')}
        </Typography>
        <Typography variant="secondary">
          {likedSongButtonLocale('song-attributes.song-playlist')}
        </Typography>
      </div>
    </div>
  )
}