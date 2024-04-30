import { ArtistImage } from "@/components/artist/child/artist-image/components/artist-image";
import { ArtistEntity } from "@/types/artist";
import { Typography } from "@/ui/typography";
import { artist_route_profile } from "@/lib/constants/routes/routes";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface IArtistLibraryCard {
	artist: ArtistEntity,
	isExpanded: boolean
}

export const ArtistLibraryCard = ({
	artist,
	isExpanded
}: IArtistLibraryCard) => {
	const { push } = useRouter();

	const handlePushToArtist = useCallback(() => {
		push(`${artist_route_profile}/${artist.id}`)
	}, [push, artist.id])

	if (!artist) return;

	return (
		<div
			onClick={handlePushToArtist}
			className="flex items-center w-full cursor-pointer bg-transparent hover:bg-neutral-800 rounded-md p-2 gap-x-4"
		>
			<ArtistImage variant="library" artist={artist}/>
			{isExpanded && (
				<div className="flex flex-col gap-y-1">
					<Typography text_color="white" size="medium" font="medium">
						{artist.name}
					</Typography>
					<Typography size="small" text_color="gray" font="normal">
						Artist
					</Typography>
				</div>
			)}
		</div>
	)
}