"use client"

import React, { useCallback } from "react"
import { SongItemTitle } from "../child/song-title/components/song-title"
import { SongArtist } from "../child/song-artist/song-artist"
import { useRouter } from "next/navigation"
import { SongFollowButton } from "../child/song-follow-button/components/song-follow-button"
import { SongPlayingAttribute } from "../child/song-playing-attribute/components/song-playing-attribute"
import { usePlay } from "@/lib/hooks/player/use-play"
import { UserTips } from "../../tooltip/components/action"
import { SongImageItem } from "../child/song-image/components/song-image"
import { SongAlbum } from "../child/song-album/components/song-album"
import { SongTimestamp } from "../child/song-timestamp/components/song-timestamp"
import { SongDuration } from "../child/song-duration/components/song-duration"
import { getRelativeTime } from "@/lib/tools/date-convert"
import { album_route, song_route } from "@/lib/constants/routes/routes"
import { SongActions } from "../child/song-actions/components/song-actions"
import { AiFillSound } from "react-icons/ai";
import { useWidget } from "@/lib/hooks/ui/use-widget";
import { usePlayerStateQuery } from "@/lib/query/player/player-state-query";
import { ISongItem, songItemVariants } from "@/components/song/types/song-item-types";
import { IconArrowDropdown } from "@/ui/icons/arrow-dropdown";
import { IconArrowDropup } from "@/ui/icons/arrow-dropup";
import { useAlbumBySong } from "@/lib/query/album/album-by-song";
import { SongTitle } from "@/ui/song-title";

export const SongItem = ({
	variant,
	type,
	className,
	library,
	song_list,
	song,
	isLoading,
	children
}: ISongItem) => {
	const { push } = useRouter();
	const { playerAttributes } = usePlayerStateQuery()
	const { widgetState, handleWidget } = useWidget();
	const { data: album } = useAlbumBySong(song.id);
	const { onPlay } = usePlay();

	const isSongWidgetVisible = widgetState.data.isOpen;

	const { created_by_list, created_by_main } = {
		created_by_list: getRelativeTime(song?.created_at || ''),
		created_by_main: getRelativeTime(song_list?.created_at || '')
	};

	const handlePlay = useCallback(async() => {
		await onPlay({
			song: song,
			songs: song_list.data ? song_list.data : (playerAttributes?.ids ? playerAttributes.ids : [])
		})
	}, [playerAttributes.ids, song, song_list.data])

	const handleClickLibrary = useCallback(async(
		e: React.MouseEvent<HTMLElement>
	) => {
		if (library) {
			switch (e.detail) {
				case 1: {
					if (album?.length! > 0) {
						push(`${album_route}/${album![0].id}`)
					} else push(`${song_route}/${song.id}`)

					break;
				}
				case 2: {
					handlePlay()
					break;
				}
			}
		}
	}, [library, onPlay, push, song?.id])

	const handleClickFollowed = useCallback(async () => {
		if (type === 'follow' || type === 'page') handlePlay()
	}, [type, handlePlay])

	if (!song) return;

	return (
		<div
			onClick={handleClickLibrary}
			onDoubleClick={handleClickFollowed}
			className={songItemVariants(({ variant, className }))}
		>
			<div className={`flex items-center gap-x-4 overflow-hidden 
        ${(library || variant === 'player' || variant === 'select') ? 'w-full' : 'w-1/2'}`}
			>
				{!(library || variant === 'player' || variant === 'select') && (
					<SongPlayingAttribute song={song} list_id={String(song_list.id)}/>
				)}
				{type !== 'page' && (
					variant !== 'compact' && (
						<SongImageItem
							song={song}
							variant={type === 'follow' ? "follow" : variant === 'player' ? "player"
								: library ? "library"
									: variant === 'select' ? "select" : undefined}
						>
							{variant === 'player' && (
								isSongWidgetVisible ? (
									<UserTips action="Cкрыть">
										<IconArrowDropdown onClick={() => handleWidget.mutate()}/>
									</UserTips>
								) : (
									<UserTips action="Показать">
										<IconArrowDropup onClick={() => handleWidget.mutate()}/>
									</UserTips>
								)
							)}
						</SongImageItem>
					)
				)}
				<div className="flex flex-col overflow-hidden justify-self-start">
					<SongItemTitle
						variant={variant === 'player' ? "player" : undefined}
						player={variant === 'player'}
						song={song}
						className={`${(variant !== 'player' && playerAttributes?.isPlaying && playerAttributes?.active?.id === song.id) && '!text-jade-500'}`}
					/>
					{variant !== "artist_library" && (
						<SongArtist variant={variant === 'player' ? "player" : "default"} song={song}/>
					)}
				</div>
				{library && playerAttributes?.isPlaying && playerAttributes?.active?.id === song.id && (
					<div className="w-[24px] h-[24px] ml-4">
						<AiFillSound size={18} className="text-jade-500"/>
					</div>
				)}
			</div>
			{!(library || variant === 'player' || variant === 'select') && (
				<div className={`flex items-center h-full ${(library) ? 'w-full' : 'w-2/3'} justify-between`}>
					{variant !== 'artist_library' && (
						<>
							<div className="flex justify-between items-center h-full">
								<div className="w-[190px] overflow-hidden">
									{album?.length! > 0 ? (
										<SongAlbum album={album![0]}/>
									) : (
										<SongTitle title={song.title} variant="player" className="text-neutral-400"/>
									)}
								</div>
							</div>
							<div className="w-[130px] overflow-hidden">
								{created_by_list && type === 'follow'
									? <SongTimestamp date={created_by_main}/>
									: <SongTimestamp date={created_by_list}/>
								}
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
								<SongActions/>
							</div>
						</div>
					) : children}
				</div>
			)}
		</div>
	)
}