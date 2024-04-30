import Link from "next/link";
import { song_route } from "@/lib/constants/routes/routes";
import { Typography } from "@/ui/typography";
import { SongEntity } from "@/types/song";

export const SongEditedNotify = ({
	song
}: {
	song: SongEntity
}) => {
	return (
		<Link href={song_route(song?.id)}>
			<Typography className="!text-black !font-bold underline">
				Перейти к треку
			</Typography>
		</Link>
	)
}