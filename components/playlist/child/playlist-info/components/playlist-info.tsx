import { Typography } from "@/ui/typography";
import { FaCircle } from "react-icons/fa";

export type PlaylistInfoType = {
	playlistSongsLength: number,
	playlistLikes?: string,
	playlistDuration?: string
}

export const PlaylistInfo = ({
	playlistDuration,
	playlistLikes,
	playlistSongsLength
}: PlaylistInfoType) => {

	if (!playlistSongsLength) return;

	return (
		<div className="flex items-center gap-x-1">
			<FaCircle size={4} className="fill-neutral-400"/>
			<Typography text_color="gray" size="small" font="semibold">
				{playlistLikes || 0} likes
			</Typography>
			<FaCircle size={4} className="fill-neutral-400"/>
			<Typography text_color="gray" size="small" font="semibold">
				{playlistSongsLength} songs
			</Typography>
			<span>,</span>
			<Typography text_color="gray" size="small" font="semibold">
				about 0 hr 0 min
			</Typography>
		</div>
	)
}