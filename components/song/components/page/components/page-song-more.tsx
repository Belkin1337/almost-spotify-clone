import { Typography } from "@/ui/typography";
import { ArtistEntity } from "@/types/artist";
import { useArtistSongListQuery } from "@/lib/query/artist/artists-songs-list-query";
import { SingleCard } from "@/components/single/card/single-card";

export const PageSongMore = ({
	artist,
	songId
}: {
	artist: ArtistEntity,
	songId: string
}) => {
	const { data: songsByArtist } = useArtistSongListQuery(artist.id);
	const songs = songsByArtist?.filter(song => song.id !== songId).slice(0, 6);

	if (!songId) return;

	return (
		<div className="flex flex-col py-6 px-4 w-full">
			<div className="flex items-center justify-between w-full px-4">
				<Typography className="text-2xl" font="bold">
					More with {artist?.name}
				</Typography>
				<Typography text_color="gray" size="small">
					Go to discography
				</Typography>
			</div>
			<div className="flex flex-row items-center overflow-hidden gap-4 w-fit">
				{songs?.map(song => (
					<SingleCard song={song} key={song.id}/>
				))}
			</div>
		</div>
	)
}