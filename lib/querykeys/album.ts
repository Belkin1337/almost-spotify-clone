import { QueryKey } from "@tanstack/react-query";

export const albumByIdQueryKey = (albumId: string): QueryKey => {
	return ["album", albumId]
}

export const albumSongsQueryKey = (albumId: string): QueryKey => {
	return ["album_songs", albumId]
}

export const userAlbumQueryKey = (userId: string): QueryKey => {
	return ["user_album", userId]
}

export const albumBySongQueryKey = (songId: string): QueryKey => {
	return ["album_by_song", songId]
}

export const albumArtistsQueryKey = (albumId: string): QueryKey => {
	return ["album_artists", albumId]
}