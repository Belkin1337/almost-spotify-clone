import { useEffect, useMemo, useState } from "react";
import { useAudio } from "@/components/player/hooks/use-audio";
import { useAudioStateQuery } from "@/lib/query/player/audio-state-query";
import { usePlayerStateQuery } from "@/lib/query/player/player-state-query";

export const useSeek = () => {
	const [trackPosition, setTrackPosition] = useState(0);
	const { playerAttributes } = usePlayerStateQuery();
	const { audioAttributes } = useAudioStateQuery()
	const { setAudioAttributes } = useAudio();

	useEffect(() => {
		if (audioAttributes?.howl && playerAttributes.isPlaying) {
			const interval = setInterval(() => {
				setAudioAttributes.mutate({
					position: audioAttributes?.howl?.seek()
				});
			}, 1000);

			return () => clearInterval(interval);
		}
	}, [setAudioAttributes, audioAttributes?.howl, playerAttributes.isPlaying]);

	const handleSliderChange = useMemo(() => (
		value: number
	) => {
		if (audioAttributes?.howl) {
			audioAttributes?.howl.seek(value);

			setAudioAttributes.mutate({
				position: audioAttributes?.howl?.seek()
			})
		}
	}, [audioAttributes?.howl, setAudioAttributes]);

	return { handleSliderChange }
}