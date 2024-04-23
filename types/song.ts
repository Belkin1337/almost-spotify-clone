import { GenreType } from "@/lib/constants/shared/genres-list";

export interface SongEntity {
  id: string,
  created_at: string,
  created_at_by_list?: string,
  user_id: string,
  title: string,
  song_path: string,
  genre: GenreType,
  lyrics: string,
  image_path: string,
  album: string,
  youtube_video_url: string,
}

export type FollowedSongs = {
  userId: string,
  songs: SongEntity[]
}

export type SongsByAlbum = {
  album_id: string,
  songs: SongEntity[]
}

export type SongAttributes = {
  id?: string,
  title?: string;
  album?: string,
  image_path?: string,
  song_path?: string,
  genre?: string,
  artists?: Array<string>;
  image?: File | undefined;
  song?: File | undefined;
  single?: boolean
};