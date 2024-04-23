import { QueryKey } from "@tanstack/react-query";

export const artistAllQueryKey: QueryKey = ["artists"];

export const artistByIdQueryKey = (artistId: string): QueryKey => {
	return ["artist", artistId]
}

export const artistSongsQueryKey = (artistId: string, count?: number): QueryKey => {
	return ["songs", artistId, count]
}

export const followedArtistQueryKey = (artistId: string): QueryKey => {
	return ["followed_artist", artistId]
}

export const userFollowedArtistsQueryKey = (userId?: string): QueryKey => {
	return ["followed_artists", userId]
}