import { useCallback } from "react";
import { usePlayerStateQuery } from "@/lib/query/player/player-state-query";
import { usePlayer } from "@/components/player/hooks/use-player";
import { SongEntity } from "@/types/song";
import { usePlay } from "@/lib/hooks/player/use-play";

export const usePlayActiveSong = () => {
	const { playerAttributes } = usePlayerStateQuery()
	const { setPlayerAttributes } = usePlayer()
	const { onPlay } = usePlay();

	const playingHandler = useCallback(async (
		song: SongEntity,
		song_list: SongEntity[]
	) => {
		if (song.id === playerAttributes?.active?.id) {
			setPlayerAttributes.mutate({
				isPlaying: !playerAttributes?.isPlaying
			})
		} else {
			await onPlay({
				song: song,
				songs: song_list ? song_list : (playerAttributes?.ids ? playerAttributes.ids : [])
			})
		}
	}, [playerAttributes?.active?.id])

	return { playingHandler }
}