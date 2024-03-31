export interface AlbumEntity {
  id: string,
  artists: Array<string>,
  title: string
  created_at?: string,
  user_id: string,
  songs: Array<string>,
  image_url?: string,
}