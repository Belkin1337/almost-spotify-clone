"use client"

import { useScopedI18n } from "@/locales/client";
import { memo, useCallback, useEffect, useState } from "react";
import { Typography } from "@/ui/typography";
import { PlaylistToolsBar } from "@/components/sections/collection/liked-songs/components/liked-songs-tools-bar";
import { SongItem } from "@/components/song/song-item/song-item";
import { useInView } from "react-intersection-observer"
import { useFollowedSongsQuery } from "@/lib/query/user/followed-songs-query";
import { SongListWrapper } from "@/components/wrappers/song-list-wrapper";
import { UserEntity } from "@/types/user";
import { USER_QUERY_KEY } from "@/lib/query/user/user-query";
import { useQueryClient } from "@tanstack/react-query"

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

export const LikedSongsList = memo(() => {
	const qc = useQueryClient()
	const user = qc.getQueryData<UserEntity>(USER_QUERY_KEY)
	if (!user) return null;
	
	const [limit, setLimit] = useState<number>(DEFAULT_LIMIT);
	
	const { ref, inView } = useInView({
		rootMargin: '50%', threshold: 1
	})

	const { data: followedSongs, isError, isLoading: followedSongsLoading, refetch } = useFollowedSongsQuery(user.id, limit);

	useEffect(() => {
		if (inView) {
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