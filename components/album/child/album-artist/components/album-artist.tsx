import { SkeletonArtistName } from "@/components/skeletons/song/skeleton-song-artist"
import { artist_route_profile } from "@/lib/constants/routes/routes"
import { useRouter } from "next/navigation"
import { Fragment, useCallback } from "react"
import { albumArtistVariants, IAlbumArtist } from "@/components/album/child/album-artist/types/album-artist-types";
import { useAlbumArtistsQuery } from "@/lib/query/album/album-artists-query";
import { CircleIcon } from "@/ui/icons/circle-icon";
import { ImageCover } from "@/ui/image-cover";

export const AlbumArtist = ({
	variant, className, album,
}: IAlbumArtist) => {
	const { data: artists, isFetching } = useAlbumArtistsQuery(album.id);
	const { push } = useRouter();
	
	const targetToAuthor = useCallback((id: string) => {
		if (id) push(artist_route_profile(id))
	}, [push])
	
	if (isFetching) return <SkeletonArtistName/>
	if (!artists) return;
	if (!album) return;
	
 	const firstArtist = artists[0];
	 
	return (
		<>
			{variant === 'page' && (
				<div className="rounded-full overflow-hidden w-[26px] h-[26px]">
					<ImageCover path={firstArtist.avatar_path} title={firstArtist.name}/>
				</div>
			)}
			<div className="flex items-center gap-1">
				{artists?.map((artist,
					idx) => (
					<Fragment key={artist.id}>
						<p
							key={artist.id}
							onClick={() => targetToAuthor(artist.id)}
							className={albumArtistVariants(({ variant, className }))}
						>
							{artist.name}
							{(idx !== artists.length - 1 && variant !== 'page') && (
								<span>,</span>
							)}
						</p>
						{variant === 'page' && <CircleIcon variant="white" size="mini"/>}
					</Fragment>
				))}
			</div>
		</>
	)
}