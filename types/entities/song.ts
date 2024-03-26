import { ArtistEntity } from "./artist";

export interface SongEntity {
  id: string,
  created_at: string,
  created_at_by_list?: string,
  user_id: string,
  artists: Array<string>,
  title: string,
  song_path: string,
  image_path: string,
  album: string,
  genre: string,
  duration?: number
}