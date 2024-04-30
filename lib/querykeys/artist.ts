import { QueryKey } from "@tanstack/react-query";

export const artistAllQueryKey = (count?: number): QueryKey => { return ["artists", count] };

export const artistByIdQueryKey = (artistId: string): QueryKey => {
	return ["artist", artistId]
}

export const artistSongsQueryKey = (artistId: string, count?: number): QueryKey => {
	return ["songs", artistId, count]
}

export const artistsByTitleQueryKey = (name: string, count?: number): QueryKey => {
	return ["artists", name, count]
}

export const followedArtistQueryKey = (userId?: string, artistId?: string): QueryKey => {
	return ["followed_artist", userId, artistId]
}

export const userFollowedArtistsQueryKey = (userId?: string): QueryKey => {
	return ["followed_artists", userId]
}