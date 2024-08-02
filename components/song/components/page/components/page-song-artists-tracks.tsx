import { Typography } from "@/ui/typography";
import { ArtistEntity } from "@/types/artist";

export const PageSongArtistsTracks = ({
	artist
}: {
	artist: ArtistEntity
}) => {

	if (!artist) return;

	return (
		<div className="flex flex-col w-full gap-y-6 p-6 mt-12 relative">
			<div className="flex flex-col gap-y-1">
				<Typography text_color="gray" size="small" font="normal">
					Popular Tracks by
				</Typography>
				<Typography className="text-xl" font="bold">
					{artist.name}
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