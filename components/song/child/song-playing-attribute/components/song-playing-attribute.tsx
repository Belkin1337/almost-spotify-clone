import { UserTips } from "@/components/tooltip/components/action";
import { Typography } from "@/ui/typography";
import { IoMdPlay } from "react-icons/io";
import { MdPause } from "react-icons/md";
import { ItemLoader } from "@/ui/item-loader";
import { useSongArtistListQuery } from "@/lib/query/song/song-artist-list-query";
import { usePlayerStateQuery } from "@/lib/query/player/player-state-query";
import {
	ISongPlayingAttribute
} from "@/components/song/child/song-playing-attribute/types/song-playing-attribute-types";
import { usePlay } from "@/lib/hooks/player/use-play";
import { useCallback } from "react";

export const SongPlayingAttribute = ({
	list_id,
	song
}: ISongPlayingAttribute) => {
	const { data: songArtist } = useSongArtistListQuery(song.id);
	const { playerAttributes } = usePlayerStateQuery();
	const { onPlay } = usePlay()

	const activeSongId = playerAttributes?.active?.id;
	const activeIsPlaying = playerAttributes.isPlaying;
	const actionText = `Play ${song.title} by ${songArtist?.firstArtist?.name}`;

	const handlePlay = useCallback(async() => {
		await onPlay({
			song: song,
			songs: playerAttributes.ids || []
		})
	}, [onPlay, playerAttributes.ids, song])

	return (
		<div className="px-4 relative overflow-hidden w-[46px]">
			{activeSongId === song.id && activeIsPlaying ? (
				<>
					<ItemLoader variant="song"/>
					<div onClick={handlePlay} className="group-hover:block hidden">
						<UserTips action="Pause">
							<MdPause size={22} className="mr-2"/>
						</UserTips>
					</div>
				</>
			) : (
				<>
					<Typography
						text_color="gray"
						className="group-hover:hidden block"
					>
						{list_id}
					</Typography>
					<div onClick={handlePlay} className="group-hover:block hidden">
						<UserTips action={actionText}>
							<IoMdPlay size={20}/>
						</UserTips>
					</div>
				</>
			)}
		</div>
	)
}