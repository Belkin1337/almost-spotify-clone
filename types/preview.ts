import { ArtistEntity } from "@/types/artist";
import { SongEntity } from "@/types/song";
import { GenreType } from "@/lib/constants/shared/genres-list";
import { RoleType } from "@/types/role";

export const SONG_TYPE_SINGLE: 'single' = 'single'
export const SONG_TYPE_ALBUM: 'album' = 'album'

export const SONG_TYPE_DEFAULT: 'song' = 'song';

export interface ICredits {
  artist?: ArtistEntity | null,
  role?: RoleType | null
}

export type PreviewSongType = {
  title?: string,
  artists?: Array<ArtistEntity>,
  album?: string,
  genre?: GenreType | null,
  image?: string;
  single?: boolean,
  credits?: Array<ICredits>
}

export type PreviewArtistType = {
  name?: string,
  description?: string,
  avatar?: string,
  cover_image?: string
}

export type PreviewAlbumType = {
  title?: string,
  artists?: ArtistEntity[],
  songs?: SongEntity[],
  image?: string
}