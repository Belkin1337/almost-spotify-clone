import { SongPlayingAttribute } from "@/components/song/child/song-playing-attribute/components/song-playing-attribute";
import { SongItemTitle } from "@/components/song/child/song-title/components/song-title";
import React, { useCallback } from "react";
import { usePlayerStateQuery } from "@/lib/query/player/player-state-query";
import { usePlay } from "@/lib/hooks/player/use-play";
import { ISongItem, songItemVariants } from "@/components/song/types/song-item-types";
import { SongImageItem } from "@/components/song/child/song-image/components/song-image";
import { SongFollowButton } from "@/components/song/child/song-follow-button/components/song-follow-button";
import { SongDuration } from "@/components/song/child/song-duration/components/song-duration";
import { SongActions } from "@/components/song/child/song-actions/components/song-actions";

export const ArtistTopSongItem = ({
	song,
	song_list,
	type,
	variant,
	className
}: ISongItem) => {
	const { playerAttributes } = usePlayerStateQuery()
	const { onPlay } = usePlay()

	const handlePlay = async () => {
		await onPlay({
			song: song,
			songs: song_list.data ? song_list.data : (playerAttributes?.ids ? playerAttributes.ids : [])
		})
	}

	const handleClickFollowed = useCallback(() => {
		if (type === 'follow' || type === 'page') {
			handlePlay()
		}
	}, [type, handlePlay])

	if (!song) return;

	return (
		<div onDoubleClick={handleClickFollowed} className={songItemVariants(({ variant, className }))}>
			<div className={`flex items-center gap-x-2 overflow-hidden w-1/2}`}>
				<SongPlayingAttribute song={song} id={String(song_list.id)}/>
				{variant !== 'compact' && <SongImageItem song={song}/>}
				<div className="flex flex-col overflow-hidden justify-self-start">
					<SongItemTitle
						song={song}
						className={`${(playerAttributes?.isPlaying && playerAttributes?.active?.id === song.id) && 'text-jade-500'}`}
					/>
				</div>
			</div>
			<div className={`flex items-center h-full justify-between`}>
				<div className="min-w-[100px] flex items-center justify-between w-[110px] gap-x-4">
					<div className="group-hover:opacity-100 opacity-0">
						<SongFollowButton songId={song.id}/>
					</div>
					<div className="flex items-center justify-between gap-x-2">
						<SongDuration duration='0:00'/>
						<SongActions song={song}/>
					</div>
				</div>
			</div>
		</div>
	)
}