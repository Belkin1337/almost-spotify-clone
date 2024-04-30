import { Typography } from "@/ui/typography";
import { Badge } from "@/ui/badge";
import { useCallback, useState } from "react";
import { useAlbumByArtistQuery } from "@/lib/query/album/albums-by-artist-query";
import { AlbumCard } from "@/components/album/components/card/album-card";
import { useRouter } from "next/navigation";
import {
	artist_route_discography_albums,
	artist_route_discography_all,
	artist_route_discography_singles,
} from "@/lib/constants/routes/routes";
import { useSinglesByArtist } from "@/lib/query/single/singles-by-artist-query";

type SortTypeArtistDiscography = 'albums' | 'singles' | 'popular';

export const ArtistDiscography = ({
	artistId
}: {
	artistId: string
}) => {
	const { push } = useRouter();
	const [sortType, setSortType] = useState<SortTypeArtistDiscography>('albums');

	const { data: artistAlbums } = useAlbumByArtistQuery(artistId, 6, sortType === 'albums')
	const { data: artistSingles } = useSinglesByArtist(artistId, 6);

	const albums = artistAlbums || [];
	const singles = artistSingles || [];
	const allItems = [
		...albums.map(album => ({ ...album, type: 'album' })),
		...singles.map(single => ({ ...single, type: 'single' }))
	];

	const popular = allItems.filter(item => {
		return item.type === 'album' || item.type === 'single';
	});

	const handlerSortType = useCallback((sortType: SortTypeArtistDiscography) => {
		setSortType(sortType);
	}, []);

	const targetToDiscographyType = useCallback(() => {
		if (sortType === 'albums') push(artist_route_discography_albums(artistId))
		if (sortType === 'popular') push(artist_route_discography_all(artistId))
		if (sortType === 'singles') push(artist_route_discography_singles(artistId))
	}, [artistId, sortType]);

	return (
		<div className="flex flex-col items-start w-full px-6 gap-2">
			<div className="flex items-center justify-between w-full">
				<Typography className="text-2xl" font="bold">
					Discography
				</Typography>
				<div onClick={targetToDiscographyType}>
					<Typography text_color="gray" size="small" variant="link">
						Show more
					</Typography>
				</div>
			</div>
			<div className="min-w-[620px] py-2">
				<div className="flex items-center gap-2">
					<Badge
						onClick={() => handlerSortType('popular')}
						type={`${sortType === 'popular' ? 'active' : 'no_active'}`}
					>
						<Typography size="small">
							Popular releases
						</Typography>
					</Badge>
					{albums.length >= 1 && (
						<Badge
							onClick={() => handlerSortType('albums')}
							type={`${sortType === 'albums' ? 'active' : 'no_active'}`}
						>
							<Typography size="small">
								Albums
							</Typography>
						</Badge>
					)}
					{singles.length >= 1 && (
						<Badge
							onClick={() => handlerSortType('singles')}
							type={`${sortType === 'singles' ? 'active' : 'no_active'}`}
						>
							<Typography size="small">
								Singles and EPs
							</Typography>
						</Badge>
					)}
				</div>
			</div>
			<div className="flex flex-row items-center gap-4 w-fit">
				{popular && sortType === 'popular' && (
					popular.map(popular => (
						<AlbumCard key={popular.id} album={popular}/>
					))
				)}
				{albums && sortType === 'albums' && (
					albums.map(album => (
						<AlbumCard key={album.id} album={album}/>
					))
				)}
				{singles.length >= 1 && sortType === 'singles' && (
					singles.map(single => (
						<AlbumCard album={single} key={single.id}/>
					))
				)}
			</div>
		</div>
	)
}