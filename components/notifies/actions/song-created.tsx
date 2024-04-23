import Link from "next/link";
import { Typography } from "@/ui/typography";
import { SongEntity } from "@/types/song";
import { song_route } from "@/lib/constants/routes/routes";

export const SongCreated = ({
	song
}: {
	song: SongEntity
}) => {
	return (
		<Link href={`${song_route}/${song?.id}`}>
			<Typography className="underline" text_color="black" font="bold">
				Перейти к треку
			</Typography>
		</Link>
	)
}