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
import { usePlayActiveSong } from "@/components/song/child/song-playing-attribute/hooks/use-play-active-song";

export const SongPlayingAttribute = ({
	list_id,
	song
}: ISongPlayingAttribute) => {
	const { playerAttributes } = usePlayerStateQuery();
	const { playingHandler } = usePlayActiveSong();

	const { data: songArtist } = useSongArtistListQuery(song.id);

	return (
		<div className="px-4 relative overflow-hidden w-[46px]">
			{(playerAttributes?.active?.id === song.id && playerAttributes.isPlaying) ? (
				<>
					<ItemLoader variant="song"/>
					<div onClick={() => playingHandler(song, playerAttributes?.ids || [])} className="group-hover:block hidden">
						<UserTips action="Pause">
							<MdPause size={22} className="mr-2"/>
						</UserTips>
					</div>
				</>
			) : (
				<>
					<Typography text_color="gray" className="group-hover:hidden block">
						{list_id}
					</Typography>
					<div onClick={() => playingHandler(song, playerAttributes?.ids || [])} className="group-hover:block hidden">
						<UserTips action={`Play ${song.title} by ${songArtist?.firstArtist.name}`}>
							<IoMdPlay size={20}/>
						</UserTips>
					</div>
				</>
			)}
		</div>
	)
}