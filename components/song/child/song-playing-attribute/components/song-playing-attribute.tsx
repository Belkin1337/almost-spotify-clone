import { UserTips } from "@/components/tooltip/components/action";
import { Typography } from "@/ui/typography";
import { IoMdPlay } from "react-icons/io";
import { MdPause } from "react-icons/md";
import { SongPlayingBar } from "@/ui/song-playing-bar";
import { useSongArtistListQuery } from "@/lib/query/song/song-artist-list-query";
import { usePlayerStateQuery } from "@/lib/query/player/player-state-query";
import {
	ISongPlayingAttribute
} from "@/components/song/child/song-playing-attribute/types/song-playing-attribute-types";
import { usePlay } from "@/lib/hooks/player/use-play";
import { useCallback } from "react";

export const SongPlayingAttribute = ({
	id,
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
		<div className="flex items-center justify-center px-2 relative overflow-hidden w-[46px]">
			{activeSongId === song.id && activeIsPlaying ? (
				<>
					<SongPlayingBar variant="song"/>
					<div onClick={handlePlay} className="group-hover:block hidden overflow-hidden">
						<UserTips action="Pause">
							<MdPause size={22} className="mr-2"/>
						</UserTips>
					</div>
				</>
			) : (
				<>
					<div className="h-[20px] w-[20px] overflow-hidden group-hover:hidden flex justify-center items-center">
						<Typography text_color="gray">
							{id}
						</Typography>
					</div>
					<div onClick={handlePlay} className="group-hover:block hidden">
						<UserTips action={actionText}>
							<IoMdPlay size={20} className="text-neutral-400"/>
						</UserTips>
					</div>
				</>
			)}
		</div>
	)
}