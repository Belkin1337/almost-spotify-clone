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

export const userPlaylistsQueryKey = (param?: string, show_hidden_playlists?: boolean, count?: number): QueryKey => {
	return ["user_playlists", param, show_hidden_playlists, count]
}

export const userAvatarQueryKey = (param: string): QueryKey => {
	return ["user_avatar", param]
}