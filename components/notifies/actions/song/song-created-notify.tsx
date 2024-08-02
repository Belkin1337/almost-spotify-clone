import Link from "next/link";
import { Typography } from "@/ui/typography";
import { song_route } from "@/lib/constants/routes/routes";
import { SongItemsProps } from "@/components/forms/song/types/song-types";

export const SongCreatedNotify = ({
	song
}: SongItemsProps) => {
	return (
		<Link href={song_route(song?.id)}>
			<Typography
				className="underline"
				text_color="black"
				font="bold"
			>
				Перейти к треку
			</Typography>
		</Link>
	)
}