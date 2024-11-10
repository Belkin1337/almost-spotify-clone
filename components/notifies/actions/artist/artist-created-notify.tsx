import Link from "next/link";
import { artist_route_profile } from "@/lib/constants/routes/routes";
import { Typography } from "@/ui/typography";

export const ArtistCreatedNotify = ({
	artistId
}: {
	artistId: string
}) => {
	return (
		<Link href={artist_route_profile(artistId)}>
			<Typography text_color="black" font="bold" className="underline">
				Перейти к артисту
			</Typography>
		</Link>
	)
}