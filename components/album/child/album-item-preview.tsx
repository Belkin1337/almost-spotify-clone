import { SONG_TYPE_ALBUM, SONG_TYPE_SINGLE } from "@/lib/constants/preview"
import { AlbumTitle } from "./album-title"
import { AlbumEntity } from "@/types/entities/album"
import { AlbumArtist } from "./album-artist"
import { Timestamp } from "@/ui/timestamp"
import { EntityType } from "@/ui/entity-type"

export const AlbumItemPagePreview = ({
  album,
  type
}: {
  album: AlbumEntity,
  type: typeof SONG_TYPE_SINGLE | typeof SONG_TYPE_ALBUM
}) => {

  if (!album) return;

  return (
    <div className="flex flex-col gap-y-2 self-end">
      <EntityType
        type={type}
      />
      <AlbumTitle
        variant="page"
        album={album}
      />
      <div className="flex items-center gap-x-2">
        <AlbumArtist
          album={album}
          className="text-white font-semibold"
        />
        <Timestamp date={album.created_at!} />
      </div>
    </div>
  )
}