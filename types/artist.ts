export interface ArtistEntity {
  id: string,
  name: string,
  description?: string,
  avatar_path?: string,
  cover_image_path?: string,
  listeners?: number,
  followers: number,
}

export type ArtistBySong = {
  songId: string,
  artists: ArtistEntity[]
}

export type FollowedArtistType = {
  userId: string,
  artist_id: string,
  id: string,
  created_at: string
}

export type ArtistsByAlbum = {
  album_id: string,
  artists: ArtistEntity[]
}

export type ArtistsBySingle = {
  single_id: string,
  artists: ArtistEntity[]
}

export type FollowedArtists = {
  userId: string,
  artists: ArtistEntity[]
}