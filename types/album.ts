export interface AlbumEntity {
  id: string,
  title: string
  created_at?: string,
  user_id: string,
  image_url?: string,
}

export interface FollowedAlbumsEntity {
  id: string,
  user_id: string,
  album_id: string,
  created_at?: string
}

export type AlbumBySong = {
  song_id: string,
  albums: AlbumEntity[]
}