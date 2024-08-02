import { Button } from "@/ui/button";
import { FaPause, FaPlay } from "react-icons/fa";
import { SongEntity } from "@/types/song";
import { usePlayerStateQuery } from "@/lib/query/player/player-state-query";
import { usePlay } from "@/lib/hooks/player/use-play";
import { useCallback } from "react";

type ArtistPlayButtonProps = {
	songList: SongEntity[]
}

export const ArtistPlayButton = ({
	songList
}: ArtistPlayButtonProps) => {
	const { playerAttributes } = usePlayerStateQuery();

	const { onPlay } = usePlay();

	const handlePlay = useCallback(() => {
		onPlay({
			song: songList[0], songs: songList
		})
	}, [songList])

	return (
		<Button
			align="centered"
			background_color="jade"
			className="hover:scale-[1.06]"
			rounded="full"
			variant="single_page"
			onClick={handlePlay}
		>
			{songList.some(item => item.id === playerAttributes.active?.id) && playerAttributes.isPlaying ? (
				<FaPause className="text-black"/>
			) : (
				<FaPlay className="text-black" />
			)}
		</Button>
	)
}