import { ArtistEntity } from "@/types/entities/artist";
import { SongEntity } from "@/types/entities/song";

export const SONG_TYPE_SINGLE: 'single' = 'single'
export const SONG_TYPE_ALBUM: 'album' = 'album'

export type PreviewSongType = {
  title: string,
  artists: Array<ArtistEntity>,
  type: typeof SONG_TYPE_SINGLE | typeof SONG_TYPE_ALBUM,
  album?: string,
  genre: string,
  image: string;
}

export type PreviewArtistType = {
  name?: string,
  description?: string,
  image?: string,
  cover_image?: string
}

export type PreviewAlbumType = {
  title?: string,
  artists?: ArtistEntity[],
  songs: SongEntity[],
  genre?: string,
  image?: string
}