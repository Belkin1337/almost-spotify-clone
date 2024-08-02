"use client"

import { useCallback } from "react"
import { SongItemTitle } from "../child/song-title/components/song-title"
import { SongArtist } from "../child/song-artist/components/song-artist"
import { SongFollowButton } from "../child/song-follow-button/components/song-follow-button"
import { SongPlayingAttribute } from "../child/song-playing-attribute/components/song-playing-attribute"
import { usePlay } from "@/lib/hooks/player/use-play"
import { SongImageItem } from "../child/song-image/components/song-image"
import { SongAlbum } from "../child/song-album/components/song-album"
import { SongTimestamp } from "../child/song-timestamp/components/song-timestamp"
import { SongDuration } from "../child/song-duration/components/song-duration"
import { getRelativeTime } from "@/lib/tools/date-convert"
import { SongActions } from "../child/song-actions/components/song-actions"
import { usePlayerStateQuery } from "@/lib/query/player/player-state-query";
import { ISongItem, songItemVariants } from "@/components/song/types/song-item-types";
import { useAlbumBySong } from "@/lib/query/album/album-by-song";
import { SongTitle } from "@/ui/song-title";
import { useSongArtistListQuery } from "@/lib/query/song/song-artist-list-query";

export const SongItem = ({
	variant,
	type,
	className,
	song_list,
	song,
	playlist,
	queryOptions,
	children
}: ISongItem) => {
	const {
		data: artists,
		isLoading: artistIsLoading,
		isSuccess
	} = useSongArtistListQuery(song.id);
	const {
		data: album,
		isLoading: albumIsLoading
	} = useAlbumBySong(song.id, isSuccess);

	const { playerAttributes } = usePlayerStateQuery();
	const { onPlay } = usePlay();

	const created_by_list = getRelativeTime(song.created_at || '');
	const created_by_main = getRelativeTime(song_list.created_at || '');
	const currentSongIsPlaying = playerAttributes.isPlaying;
	const currentSongId = playerAttributes?.active?.id;

	const handlePlay = useCallback(async () => {
		await onPlay({
			song: song,
			songs: song_list.data ? song_list.data : (playerAttributes?.ids ? playerAttributes.ids : [])
		})
	}, [onPlay, playerAttributes.ids])

	const handleClickFollowed = useCallback(async () => {
		if (type === 'follow' || type === 'page') {
			await handlePlay()
		}
	}, [handlePlay, type])

	const isCurrentPlaying = currentSongIsPlaying && currentSongId === song.id ? 'text-jade-500' : '';

	if (!song || !artists) return;

	return (
		<div onDoubleClick={handleClickFollowed} className={songItemVariants(({ variant, className }))}>
			<div className="flex items-center gap-x-2 overflow-hidden w-1/2">
				<SongPlayingAttribute song={song} id={String(song_list.id)}/>
				{type !== 'page' && (
					variant !== 'compact' && (
						<SongImageItem
							song={song}
							variant={type === 'follow' ? "follow" : "library"}
						/>
					)
				)}
				<div className="flex flex-col overflow-hidden justify-self-start">
					<SongItemTitle
						song={song}
						type="link"
						className={isCurrentPlaying}
						isLoading={queryOptions?.isLoading}
					/>
					{variant !== "artist_library" && (
						<SongArtist
							variant={"default"}
							artists={artists.artists}
							firstArtist={artists.firstArtist}
							isLoading={artistIsLoading}
						/>
					)}
				</div>
			</div>
			<div className="flex items-center h-full w-2/3 justify-between">
				{variant !== 'artist_library' && (
					<>
						<div className="flex justify-between items-center h-full">
							<div className="w-[190px] overflow-hidden">
								{album?.length! > 0 ? (
									<SongAlbum album={album![0]} isLoading={albumIsLoading}/>
								) : (
									<SongTitle
										title={song.title}
										variant="player"
										className="text-neutral-400"
									/>
								)}
							</div>
						</div>
						<div className="w-[130px] overflow-hidden">
							{created_by_list && type === 'follow' ? <SongTimestamp date={created_by_main}/> : <SongTimestamp date={created_by_list}/>}
						</div>
					</>
				)}
				{type !== 'edit' ? (
					<div className="flex items-center justify-between w-[110px] gap-x-4 min-w-[100px] overflow-hidden">
						<div className="group-hover:opacity-100 opacity-0">
							<SongFollowButton songId={song.id}/>
						</div>
						<div className="flex items-center justify-between gap-x-2 pr-4">
							<SongDuration duration='0:00'/>
							<SongActions
								song={song}
								playlist={playlist}
							/>
						</div>
					</div>
				) : children}
			</div>
		</div>
	)
}

// const handleClickLibrary = useCallback(async(
// 	e: React.MouseEvent<HTMLElement>
// ) => {
// 	if (library) {
// 		switch (e.detail) {
// 			case 1: {
// 				if (album?.length! > 0) {
// 					push(`${album_route}/${album![0].id}`)
// 				} else push(`${song_route}/${song.id}`)
//
// 				break;
// 			}
// 			case 2: {
// 				await handlePlay();
// 				break;
// 			}
// 		}
// 	}
// }, [push, album, library, song?.id, handlePlay])

// {playerAttributes?.isPlaying && playerAttributes?.active?.id === song.id && (
// 	<div className="w-[24px] h-[24px] ml-4">*/}
// 		<AiFillSound size={18} className="text-jade-500"/>
// 	</div>
// )}