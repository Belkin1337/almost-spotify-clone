import { Typography } from "@/ui/typography"
import { ToggleWidgetButton } from "./widget-close-button"
import { SongImageItem } from "../../child/song-image"
import { SongTitle } from "../../child/song-title"
import { SongAuthor } from "../../child/song-author"
import { artist_route, song_route } from "@/lib/constants/routes"
import { useRouter } from "next/navigation"
import { SongEntity } from "@/types/entities/song"

export const WidgetSongItem = ({
  song 
}: {
  song: SongEntity
}) => {
  const { push } = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Typography
          font="bold"
          className="text-white font-bold"
          variant="link"
          onClick={() => {
            push(`${artist_route}/${song?.author}`)
          }}
        >
          {song?.author}
        </Typography>
        <ToggleWidgetButton />
      </div>
      <SongImageItem
        imageVariant="widget"
        song={song!}
        onClick={() => {
          push(`${song_route}/${song?.id}`)
        }}
      />
      <div className="flex flex-col w-min">
        <SongTitle
          song={song!}
          variant="widget"
        />
        <SongAuthor
          variant="widget"
          author={song?.author!}
        />
      </div>
    </>
  )
}