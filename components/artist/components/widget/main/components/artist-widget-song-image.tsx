import Image from "next/image";
import { ArtistEntity } from "@/types/artist";

export const ArtistWidgetSongImage = ({
	imageUrl,
	artist
}: {
	imageUrl: string,
	artist: ArtistEntity
}) => {
	return (
		<Image
			src={imageUrl}
			alt={artist.name}
			width={1200}
			height={1260}
			loading="lazy"
			draggable="false"
			className="w-full h-full object-center absolute right-0 top-0 bottom-0 left-0 object-cover"
		/>
	)
}