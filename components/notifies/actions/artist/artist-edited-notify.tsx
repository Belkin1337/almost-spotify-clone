import { ArtistEntity } from "@/types/artist";
import Link from "next/link";
import { artist_route_profile } from "@/lib/constants/routes/routes";
import { Typography } from "@/ui/typography";

export const ArtistEditedNotify = ({
	artist
}: {
	artist: ArtistEntity
}) => {
	return (
		<Link href={`${artist_route_profile}/${artist?.id}`}>
			<Typography className="underline" text_color="black" font="bold">
				Перейти к артисту
			</Typography>
		</Link>
	)
}