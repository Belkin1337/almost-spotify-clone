import Image from "next/image";
import { ArtistEntity } from "@/types/artist";

type ArtistWidgetSongImageProps = {
	imageUrl: string,
	artist: ArtistEntity
}

export const ArtistWidgetSongImage = ({
	imageUrl,
	artist
}: ArtistWidgetSongImageProps) => {
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