import { Button } from "@/ui/button";
import { FaPause, FaPlay } from "react-icons/fa";
import { SongEntity } from "@/types/song";
import { usePlayerStateQuery } from "@/lib/query/player/player-state-query";
import { usePlay } from "@/lib/hooks/player/use-play";
import { useCallback } from "react";

export const ArtistPlayButton = ({
	song_list
}: {
	song_list: SongEntity[]
}) => {
	const { playerAttributes } = usePlayerStateQuery();

	const { onPlay } = usePlay();

	const handlePlay = useCallback(() => {
		onPlay({
			song: song_list[0],
			songs: song_list
		})
	}, [song_list])

	return (
		<Button
			align="centered"
			background_color="jade"
			className="hover:scale-[1.06]"
			rounded="full"
			variant="single_page"
			onClick={handlePlay}
		>
			{song_list.some(item => item.id === playerAttributes.active?.id) && playerAttributes.isPlaying ? (
				<FaPause className="text-black"/>
			) : (
				<FaPlay className="text-black" />
			)}
		</Button>
	)
}