import { SongPlayButton } from "@/components/song/child/song-play-button/components/song-play-button"
import { SongFollowButton } from "../../song-follow-button/components/song-follow-button"
import { SongEntity } from "@/types/song"

export const SongToolsBar = ({
  song,
}: {
  song: SongEntity
}) => {
  return (
    <div className="flex items-center gap-x-10 px-6 py-4">
      <SongPlayButton variant="single_page" song={song}/>
      <div className="flex items-center gap-x-4">
        <SongFollowButton
          songId={song.id}
          variant={{
            page: true
          }}
        />
      </div>
    </div>
  )
}