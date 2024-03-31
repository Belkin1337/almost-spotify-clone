import { SongEntity } from "./song"

export interface PlaylistEntity {
  id: string,
  user_id: string,
  author: string,
  title: string,
  songs: Array<string> // [song id],
  image_path: string
}

export interface FollowedSongs {
  created_at: string,
  songs: SongEntity[]
}