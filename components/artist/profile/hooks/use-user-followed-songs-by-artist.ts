import { useFollowedSongsQuery } from "@/lib/query/user/followed-songs-query";
import { useArtistSongListQuery } from "@/lib/query/artist/artists-songs-list-query";
import { useCallback } from "react";
import { useUserQuery } from "@/lib/query/user/user-query";

export const useUserFollowedSongsByArtist = (
	artistId: string
) => {
	const { data: user } = useUserQuery();
	const { data: userFollowedSongs } = useFollowedSongsQuery(user?.id!);
	const { data: artistSongs, isLoading } = useArtistSongListQuery(artistId);

	const followedSongsByArtist = useCallback(() => {
		if (!userFollowedSongs || !artistSongs) return [];

		const likedSongIds = userFollowedSongs.songs?.map(
			followedSong => followedSong.id
		);

		return artistSongs.filter(artistSong => likedSongIds.includes(artistSong.id));
	}, [artistSongs, userFollowedSongs]);

	const followedSongs = followedSongsByArtist();

	return { followedSongs, isLoading }
}