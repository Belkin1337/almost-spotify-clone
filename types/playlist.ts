export interface PlaylistEntity {
  id: string,
  user_id: string,
  title: string,
  image_path: string,
  description: string,
  created_at: string,
  attributes: {
    is_public: boolean,
    is_show_profile: boolean
  }
}

export interface FollowedPlaylistsEntity {
  user_id: string,
  created_at: string,
  playlists: PlaylistEntity[]
}