import { SongItemTitle } from "../../../child/song-title/components/song-title"
import { SongEntity } from "@/types/song"
import { SongArtist } from "../../../child/song-artist/components/song-artist"
import { SONG_TYPE_ALBUM, SONG_TYPE_DEFAULT, SONG_TYPE_SINGLE } from "@/types/form"
import { EntityType } from "@/ui/entity-type"
import { Timestamp } from "@/ui/timestamp"
import { useSongArtistListQuery } from "@/lib/query/song/song-artist-list-query";

type SongItemPagePreviewType = {
  song: SongEntity,
  type: typeof SONG_TYPE_SINGLE | typeof SONG_TYPE_ALBUM | typeof SONG_TYPE_DEFAULT
}

export const PageSongPreview = ({
  song,
  type
}: SongItemPagePreviewType) => {
  const {
    data: artists,
    isLoading: artistIsLoading,
    isSuccess
  } = useSongArtistListQuery(song.id);

  if (!song || !artists) return;

  return (
    <div className="flex flex-col gap-y-2 self-end">
      <EntityType type={type} />
      <SongItemTitle variant="page" song={song}/>
      <div className="flex items-center gap-x-2">
        <SongArtist
          variant="page"
          artists={artists.artists}
          firstArtist={artists.firstArtist}
          isLoading={artistIsLoading}
          className="text-white font-semibold"
        />
        <Timestamp date={song.created_at} />
      </div>
    </div>
  )
}