import { Typography } from "@/ui/typography";
import { ArtistEntity } from "@/types/artist";
import { useAlbumByArtistQuery } from "@/lib/query/album/albums-by-artist-query";
import { AlbumCard } from "@/components/album/card/album-card";

export const PageAlbumMore = ({
	artist,
	albumId
}: {
	artist: ArtistEntity,
	albumId: string
}) => {
	const { data: albumsByArtist } = useAlbumByArtistQuery(artist.id);
	const albums = albumsByArtist?.filter(album => album.id !== albumId);

	if (!albumId) return;

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
				{albums?.map(album => (
					<AlbumCard key={album.id} album={album}/>
				))}
			</div>
		</div>
	)
}