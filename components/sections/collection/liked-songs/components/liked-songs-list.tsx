"use client"

import { useScopedI18n } from "@/locales/client";
import { memo, useCallback, useEffect, useState } from "react";
import { Typography } from "@/ui/typography";
import { PlaylistToolsBar } from "@/components/sections/collection/liked-songs/components/liked-songs-tools-bar";
import { SongItem } from "@/components/song/song-item/song-item";
import { useInView } from "react-intersection-observer"
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { useFollowedSongsQuery } from "@/lib/query/user/followed-songs-query";
import { SongListWrapper } from "@/components/wrappers/song-list-wrapper";

export const DEFAULT_LIMIT = 10;

const CollectionTracksNotFounded = () => {
	const likedLocale = useScopedI18n('main-service.pages.liked-content');

	return (
		<div className="flex w-full items-center h-[80%] justify-center p-6">
			<Typography className="text-2xl" font="medium">
				{likedLocale('navbar.is-not-liked-songs')}
			</Typography>
		</div>
	)
}

const SomethingWrongError = () => {
	return (
		<Typography className="text-3xl">
			Что-то пошло не так...
		</Typography>
	)
}

// const supabase = createClient();

export const LikedSongsList = memo(({
	userId
}: {
	userId: string
}) => {
	// const queryClient = useQueryClient();

	const [limit, setLimit] = useState<number>(DEFAULT_LIMIT);
	// const cachedData = queryClient.getQueryData<FollowedSongs>(followedSongsQueryKey(userId, limit));

	const { ref, inView, entry } = useInView({
		rootMargin: '50%',
		threshold: 1
	})

	const {
		data: followedSongs,
		isError,
		isLoading: followedSongsLoading,
		refetch,
		isFetching
	} = useFollowedSongsQuery(userId, limit);

	// const getCachedSongs = useCallback(() => {
	// 	if (cachedData) {
	// 		return cachedData?.songs
	// 	}
	// }, [cachedData])

	useEffect(() => {
		if (inView) {
			// const cachedSongs = getCachedSongs();

			refetch();
			setLimit((limit) => limit + 10);
		}
	}, [inView]);

	const getRandomFollowedSong = useCallback(() => {
		if (followedSongs?.songs) {
			return Math.floor(Math.random() * followedSongs?.songs.length);
		} else return 1
	}, [followedSongs?.songs])

	const randomFollowedSong = getRandomFollowedSong();

	if (isError && !followedSongs?.songs) return <SomethingWrongError/>

	return (
		followedSongs && (
			followedSongs.songs?.length === 0 ? <CollectionTracksNotFounded/> : (
				<>
					<PlaylistToolsBar
						song={followedSongs.songs[randomFollowedSong]}
						song_list={followedSongs.songs}
					/>
					<SongListWrapper ref={ref}>
						{followedSongs?.songs.map((song,
							idx) => (
							<SongItem
								type="follow"
								key={song.id}
								song={song}
								queryOptions={{ isLoading: followedSongsLoading }}
								song_list={{
									id: String(idx + 1),
									created_at: song.created_at_by_list || '1',
									data: followedSongs.songs
								}}
							/>
						))}
					</SongListWrapper>
				</>
			)
		)
	)
})

LikedSongsList.displayName = 'LikedSongsList'