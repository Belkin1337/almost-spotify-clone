import { FollowedSongs } from "./playlist";
import { SongEntity } from "./song";

export interface ArtistEntity {
  id: string,
  name: string,
  description?: string,
  avatar_url?: string,
  cover_image_url?: string,
  listeners?: number,
  followers: number,
  library: {
    playlists?: FollowedSongs[],
    albums: SongEntity[],
    songs?: SongEntity[],
  }
}