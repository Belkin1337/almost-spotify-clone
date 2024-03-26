export interface AlbumEntity {
  id: string,
  artist: string,
  title: string
  created_at?: string,
  user_id: string,
  songs: Array<string>,
  image_url?: string,
}