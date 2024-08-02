"use client"

import { Typography } from "@/ui/typography";
import { SongEntity } from "@/types/song";

export const PageSongRecommendations = ({
	song
}: {
	song: SongEntity
}) => {
	// const { data: songsByTargetSongGenre } = useSongsByGenre(song.genre)
	//

	return (
		<div className="flex flex-col w-full gap-y-6 p-6 mt-12 relative">
			<div className="flex flex-col gap-y-1">
				<Typography className="text-xl" font="bold">
					Recommended
				</Typography>
				<Typography text_color="gray" size="small" font="normal">
					Based on this song
				</Typography>
			</div>
			<div className="flex flex-col gap-y-1">
				{/*{recommendedSongsFiltered?.map((song,*/}
				{/*	idx) => (*/}
				{/*	<CollectionsSongItem*/}
				{/*		playlist={playlist}*/}
				{/*		key={song.id}*/}
				{/*		song={song}*/}
				{/*	/>*/}
				{/*))}*/}
			</div>
		</div>
	)
}