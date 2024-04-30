import { PlayerVolumeControls } from "@/components/player/controls/components/player-volume-controls";
import { PlayerSongItem } from "../song/components/player/player-song-item";
import { UserEntity } from "@/types/user";
import { memo } from "react";
import { usePlayerStateQuery } from "@/lib/query/player/player-state-query";
import { PlayerPlayControls } from "@/components/player/controls/components/player-play-controls";
import { PlayerPrevSong } from "@/components/player/controls/components/prev-song";
import { PlayerNextSong } from "@/components/player/controls/components/next-song";
import { SeekItem } from "@/components/player/controls/components/seek-item";

export const Player = memo(({
	user
}: {
	user: UserEntity
}) => {
	const { playerAttributes } = usePlayerStateQuery()
	const isPlaying = playerAttributes?.isPlaying;

	if (!user || !playerAttributes?.active || !playerAttributes) return;

	return (
		(playerAttributes?.active) && (
			<div className="fixed flex items-center bottom-0 bg-black w-full h-[88px] px-4">
				<div className="flex justify-stretch items-center h-full w-full">
					<PlayerSongItem song={playerAttributes?.active}/>
					<PlayerPlayControls variant="mobile" state={isPlaying || false}/>
					<div className="hidden h-full md:flex flex-col justify-center gap-y-[6px] items-center w-[40%] max-h-[760px]">
						<div className="flex flex-row gap-x-6 w-full justify-center items-center">
							<PlayerPrevSong/>
							<PlayerPlayControls variant="desktop" state={isPlaying || false}/>
							<PlayerNextSong/>
						</div>
						<SeekItem/>
					</div>
					<PlayerVolumeControls/>
				</div>
			</div>
		)
	)
})

Player.displayName = 'Player';