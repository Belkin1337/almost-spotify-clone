import { SongFollowButton } from "@/components/song/child/song-follow-button/components/song-follow-button"
import { SongItem } from "@/components/song/song-item/song-item"
import { SongEntity } from "@/types/song"

export const PlayerSongItem = ({
  song,
  list
}: {
  song: SongEntity,
  list: SongEntity[]
}) => {

  if (!song) return;

  return (
    <div className="flex items-center gap-x-4 w-[30%] overflow-hidden">
      <SongItem
        variant="player"
        song={song}
        song_list={{
          data: list
        }}
      />
      <SongFollowButton songId={song?.id!} />
    </div>
  )
}