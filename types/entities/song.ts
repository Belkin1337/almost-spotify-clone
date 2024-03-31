import { SONG_TYPE_ALBUM, SONG_TYPE_SINGLE } from "@/lib/constants/preview";

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
  type: typeof SONG_TYPE_ALBUM | typeof SONG_TYPE_SINGLE,
  duration?: number
}