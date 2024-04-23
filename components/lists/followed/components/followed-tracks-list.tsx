"use client"

import { SongItem } from "@/components/song/song-item/song-item";
import { PlaylistToolsBar } from "./followed-tools-bar";
import { SongListTableHead } from "@/ui/song-list-table-head";
import { useFollowedSongsQuery } from "@/lib/query/user/followed-songs-query";
import { useScopedI18n } from "@/locales/client";
import { memo, useCallback } from "react";
import { Typography } from "@/ui/typography";

export const FollowedTracksList = memo(({
	userId
}: {
	userId: string
}) => {
	const { data: followedSongs, isError, isLoading } = useFollowedSongsQuery(userId);
	const likedLocale = useScopedI18n('main-service.pages.liked-content');

	const getRandomFollowedSong = useCallback(() => {
		if (followedSongs?.songs) {
			return Math.floor(Math.random() * followedSongs?.songs?.length);
		} else return 1
	}, [followedSongs?.songs])

	const randomFollowedSong = getRandomFollowedSong();

	if (isError && !followedSongs?.songs) return (
		<Typography className="text-3xl">
			Что-то пошло не так...
		</Typography>
	)

	return (
		followedSongs?.songs && !isError && (
			followedSongs.songs?.length === 0 ? (
				<div className="flex w-full border items-center h-[80%] justify-center p-6">
					<Typography className="text-2xl" font="medium">
						{likedLocale('navbar.is-not-liked-songs')}
					</Typography>
				</div>
			) : (
				<>
					<PlaylistToolsBar song={followedSongs?.songs[randomFollowedSong]} song_list={followedSongs.songs}/>
					<SongListTableHead/>
					<div className="flex flex-col gap-y-2 w-full p-6">
						{followedSongs?.songs.map((song, idx) => (
							<div key={song.id} className="flex items-center w-full">
								<div className="flex-1">
									<SongItem
										type="follow"
										song={song}
										isLoading={isLoading}
										song_list={{
											id: String(idx + 1),
											created_at: song.created_at_by_list || '1',
											data: followedSongs.songs
										}}
									/>
								</div>
							</div>
						))}
					</div>
				</>
			)
		)
	)
})

FollowedTracksList.displayName === 'FollowedTracksList'