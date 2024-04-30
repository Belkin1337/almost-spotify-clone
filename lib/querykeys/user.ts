import { QueryKey } from "@tanstack/react-query";

export const userQueryKey: QueryKey = ["user"];

export const userSongsQueryKey = (userId: string): QueryKey => {
	return ["user_songs", userId]
}

export const userArtistsQueryKey = (userId: string): QueryKey => {
	return ["user_artists", userId]
}

export const userByIdQueryKey = (userId: string): QueryKey => {
	return ["user", userId]
}

export const userPlaylistsQueryKey = (userId?: string, show_hidden_playlists?: boolean, count?: number): QueryKey => {
	return ["user_playlists", userId, show_hidden_playlists, count]
}

export const userAvatarQueryKey = (userId: string): QueryKey => {
	return ["user_avatar", userId]
}

export const userFollowers = (userId?: string): QueryKey => {
	return ["user_followers", userId]
}

export const userFollower = (userId?: string, responder_id?: string): QueryKey => {
	return ["user_follower", userId, responder_id]
}