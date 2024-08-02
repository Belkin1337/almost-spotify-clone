import Link from "next/link";
import { song_route } from "@/lib/constants/routes/routes";
import { Typography } from "@/ui/typography";
import { SongItemsProps } from "@/components/forms/song/types/song-types";

export const SongEditedNotify = ({
	song
}: SongItemsProps) => {
	return (
		<Link href={song_route(song?.id)}>
			<Typography className="!text-black !font-bold underline">
				Перейти к треку
			</Typography>
		</Link>
	)
}