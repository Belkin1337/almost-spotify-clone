import { PlayButton } from "@/components/buttons/play-button"
import { ShuffleButton } from "@/components/buttons/shuffle-button"
import { FollowButton } from "../../child/song-follow-button"
import { SongEntity } from "@/types/entities/song"

export const SongItemPageActions = ({
  song
}: {
  song: SongEntity
}) => {
  return (
    <div className="flex items-center gap-x-10 px-6 py-4">
      <PlayButton
        variant="single_page"
        song={song}
      />
      <div className="flex items-center gap-x-4">
        <ShuffleButton />
        <FollowButton
          songId={song.id}
          variant={{
            page: true
          }}
        />
      </div>
    </div>
  )
}