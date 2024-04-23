import { QueryKey } from "@tanstack/react-query";

export const playlistByParamIdQueryKey = (param: string): QueryKey => {
	return ["playlist", param]
}

export const playlistSongsQueryKey = (param: string): QueryKey => {
	return ["playlist_songs", param]
}