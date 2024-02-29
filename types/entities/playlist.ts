import { SongEntity } from "./song"


export interface PlaylistEntity {
  id: string,
  user_id: string,
  author: string,
  title: string,
  songs: SongEntity[],
  image_path: string
}

export interface FollowedSongs {
  songs: SongEntity[]
}