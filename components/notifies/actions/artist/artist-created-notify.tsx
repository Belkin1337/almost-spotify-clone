import Link from "next/link";
import { artist_route_profile } from "@/lib/constants/routes/routes";
import { Typography } from "@/ui/typography";
import { ArtistItemProps } from "@/components/artist/types/artist-types";

export const ArtistCreatedNotify = ({
	artist
}: ArtistItemProps) => {
	return (
		<Link href={artist_route_profile(artist?.id)}>
			<Typography text_color="black" font="bold" className="underline">
				Перейти к артисту
			</Typography>
		</Link>
	)
}