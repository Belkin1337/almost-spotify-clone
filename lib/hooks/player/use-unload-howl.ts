import { useAudioStateQuery } from "@/lib/query/player/audio-state-query";
import { usePlayer } from "@/components/player/hooks/use-player";
import { useAudio } from "@/components/player/hooks/use-audio";
import { useCallback } from "react";

export function useUnloadHowl() {
	const { audioAttributes } = useAudioStateQuery()
	const { setPlayerAttributes } = usePlayer();
	const { setAudioAtrributes } = useAudio()

	const howl = audioAttributes.howl;

	const unload = useCallback(() => {
		if (howl) {
			howl.unload();

			setPlayerAttributes.mutate({
				isLoaded: false,
				isPlaying: false,
				duration: 0
			})

			setAudioAtrributes.mutate({
				howl: null
			})
		}
	}, [howl, setAudioAtrributes, setPlayerAttributes]);

	return { unload }
}