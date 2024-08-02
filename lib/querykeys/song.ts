import { QueryKey } from "@tanstack/react-query";
import { SongEntity } from "@/types/song";

export const songsAllQueryKey = (count?: number): QueryKey => {
	return ["songs", count]
};

export const songByParamIdQueryKey = (param: string): QueryKey => {
	return ["song", param]
};

export const followedSongsQueryKey = (userId?: string, count?: number): QueryKey => {
	return ["followed_songs", userId, count];
}

export const songByUrlQueryKey = (song?: SongEntity, path?: string): QueryKey => {
	return ["song_url", song, path]
}

export const songByTitleQueryKey = (title: string, count?: number): QueryKey => {
	return ["song", title, count]
}

export const songArtistsQueryKey = (songId?: string): QueryKey => {
	return ["song_artist", songId]
}

export const songByIdQueryKey = (songId: string): QueryKey => {
	return ["song", songId]
}

export const followedSongQueryKey = (userId: string, songId: string): QueryKey => {
	return ['followed_song', userId, songId]
}

export const songPreviewQueryKey: QueryKey = ["form-song-preview"]