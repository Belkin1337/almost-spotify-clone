import Link from "next/link";
import { artist_route_profile } from "@/lib/constants/routes/routes";
import { Typography } from "@/ui/typography";
import { ArtistEntity } from "@/types/artist";

export const ArtistCreatedNotify = ({
	artist
}: {
	artist: ArtistEntity
}) => {
	return (
		<Link href={`${artist_route_profile}/${artist.id}`}>
			<Typography text_color="black" font="bold" className="underline">
				Перейти к артисту
			</Typography>
		</Link>
	)
}