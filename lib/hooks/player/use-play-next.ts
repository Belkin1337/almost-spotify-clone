import { usePlayerStateQuery } from "@/lib/query/player/player-state-query";
import { useCallback } from "react";
import { useFollowedSongsQuery } from "@/lib/query/user/followed-songs-query";
import { getGenreById } from "@/lib/queries/genre/single/get-genre-by-id";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { getSongsByGenre } from "@/lib/queries/song/multiple/get-songs-by-genre";
import { getSongsByArtist } from "@/lib/queries/song/multiple/get-songs-by-artist";
import { useSongArtistListQuery } from "@/lib/query/song/song-artist-list-query";
import { useSetSongAttributes } from "@/lib/hooks/player/use-set-song-attributes";
import { useQueryClient } from "@tanstack/react-query"
import { UserEntity } from "@/types/user";
import { USER_QUERY_KEY } from "@/lib/query/user/user-query";

const supabase = createClient();

export const usePlayNext = () => {
	const qc = useQueryClient();
	const user = qc.getQueryData<UserEntity>(USER_QUERY_KEY)
	const { playerAttributes } = usePlayerStateQuery()
	const { data: followedSongs } = useFollowedSongsQuery(user?.id!);
	const { setNewSongAttributes } = useSetSongAttributes()

	const currentSong = playerAttributes.active;
	const currentSongArray = playerAttributes.ids!

	const { data: artistBySong } = useSongArtistListQuery(currentSong?.id || "")

	const setRandomFollowedSong = useCallback(async () => {
		if (followedSongs && followedSongs?.songs!.length >= 2) {
			const _randomIdxFollowedSongs = Math.floor(Math.random() * followedSongs?.songs?.length!);

			const nextSong = followedSongs.songs![_randomIdxFollowedSongs];

			if (currentSong !== nextSong) {
				await setNewSongAttributes({
					nextSong: nextSong,
					nextSongArray: followedSongs.songs!
				})

			} else {
				await setRandomArtistSong()
			}
		} else {
			await setRandomArtistSong()
		}
	}, [currentSong, followedSongs, setNewSongAttributes])

	const setRandomArtistSong = useCallback(async () => {
		if (artistBySong) {
			const { data } = await getSongsByArtist(supabase, artistBySong?.firstArtist.id)

			const songsByArtist = data?.map(item => item.songs).flat();

			if (songsByArtist) {
				const _randomIdxSongsByArtist = Math.floor(Math.random() * songsByArtist.length);

				const nextSong = songsByArtist[_randomIdxSongsByArtist];

				if (currentSong !== nextSong) {
					await setNewSongAttributes({
						nextSong: nextSong,
						nextSongArray: songsByArtist
					})
				} else {
					await setRandomGenredSong();
				}
			}
		}
	}, [artistBySong, currentSong, setNewSongAttributes])

	const setRandomGenredSong = useCallback(async () => {
		const { data: currentGenre, error: currentGenreError } = await getGenreById(
			supabase,
			currentSong!.genre.toString()
		);

		if (currentGenreError) throw currentGenreError;

		const { data: songsByGenre, error: songsByGenreError } = await getSongsByGenre(supabase, currentGenre?.id, 10)

		if (songsByGenreError) throw songsByGenreError;

		if (songsByGenre && songsByGenre.length > 0) {
			const _randomIdxSongByCurrentSongGenre = Math.floor(Math.random() * songsByGenre?.length);

			const nextSong = songsByGenre[_randomIdxSongByCurrentSongGenre];

			if (currentSong !== nextSong) {
				await setNewSongAttributes({
					nextSong: nextSong,
					nextSongArray: songsByGenre
				})
			} else {
				await setRandomArtistSong();
			}

		} else {
			const nextSong = currentSong;

			if (nextSong) {
				await setNewSongAttributes({
					nextSong: nextSong,
					nextSongArray: currentSongArray
				})
			}

		}
	}, [currentSong, setNewSongAttributes, setRandomArtistSong])

	const setRandomSongByFollowed = useCallback(async () => {
		const currentIdx = currentSongArray.findIndex(song => song.id === currentSong?.id)

		if (currentIdx !== -1) {
			const nextIdx = (currentIdx + 1) % currentSongArray.length;
			const nextSong = currentSongArray[nextIdx];

			if (nextIdx === 0) {
				await setRandomGenredSong();
			} else {
				if (currentSong !== nextSong) {
					await setNewSongAttributes({
						nextSong: nextSong,
						nextSongArray: currentSongArray
					})
				} else {
					await setRandomArtistSong();
				}
			}
		} else {
			await setRandomArtistSong()
		}
	}, [currentSong, currentSongArray, setNewSongAttributes, setRandomArtistSong, setRandomGenredSong])


	const onPlayNext = useCallback(async () => {
		if (currentSongArray.length >= 2 && currentSong) {
			await setRandomSongByFollowed()
		} else if (followedSongs) {
			await setRandomFollowedSong()
		} else if (!followedSongs) {
			await setRandomGenredSong();
		} else {
			console.log("Not active song instance.");
		}
	}, [
		followedSongs,
		currentSong,
		currentSongArray.length,
		setRandomGenredSong,
		setRandomFollowedSong,
		setRandomSongByFollowed
	])

	return { onPlayNext, }
};