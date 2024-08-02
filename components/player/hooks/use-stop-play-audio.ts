import { usePlayer } from "@/components/player/hooks/use-player";
import { usePlayerStateQuery } from "@/lib/query/player/player-state-query";

export const useStopPlayAudio = () => {
	const { setPlayerAttributes } = usePlayer()
	const { playerAttributes } = usePlayerStateQuery()

	const stop = (howl: Howl) => {
		if (howl) {
			if (playerAttributes.isPlaying) {
				howl.pause();
				setPlayerAttributes.mutate({ isPlaying: false });
			} else {
				howl.play();
				setPlayerAttributes.mutate({ isPlaying: true });
			}
		}
	}

	return { stop }
}