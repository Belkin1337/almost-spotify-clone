import { ArtistImage } from "@/components/artist/child/artist-image/components/artist-image";
import { ArtistEntity } from "@/types/artist";
import { Typography } from "@/ui/typography";
import { artist_route_profile } from "@/lib/constants/routes/routes";
import Link from "next/link";

interface IArtistLibraryCard {
	artist: ArtistEntity
}

export const ArtistLibraryCard = ({
	artist,
	isCollapsed
}: {
	artist: ArtistEntity,
	isCollapsed: boolean
}) => {

	if (!artist) return;

	return (
		<Link
			href={`${artist_route_profile}/${artist.id}`}
			className="flex items-center w-full cursor-pointer bg-transparent hover:bg-neutral-800 rounded-md p-2 gap-x-4"
		>
			<ArtistImage variant="library" artist={artist}/>
			{isCollapsed && (
				<div className="flex flex-col gap-y-1">
					<Typography text_color="white" size="medium" font="medium">
						{artist.name}
					</Typography>
					<Typography size="small" text_color="gray" font="normal">
						Artist
					</Typography>
				</div>
			)}
		</Link>
	)
}