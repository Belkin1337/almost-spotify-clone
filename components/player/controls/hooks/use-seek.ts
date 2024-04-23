import { useEffect, useMemo, useState } from "react";
import { useAudio } from "@/components/player/hooks/use-audio";
import { useAudioStateQuery } from "@/lib/query/player/audio-state-query";
import { usePlayerStateQuery } from "@/lib/query/player/player-state-query";

export const useSeek = () => {
	const [trackPosition, setTrackPosition] = useState(0);
	const { playerAttributes } = usePlayerStateQuery();
	const { audioAttributes } = useAudioStateQuery()
	const { setAudioAtrributes } = useAudio();

	useEffect(() => {
		if (audioAttributes?.howl && playerAttributes.isPlaying) {
			const interval = setInterval(() => {
				setAudioAtrributes.mutate({
					position: audioAttributes?.howl?.seek()
				});
			}, 1000);

			return () => clearInterval(interval);
		}
	}, [setAudioAtrributes, audioAttributes?.howl, playerAttributes.isPlaying]);

	// const handleSliderChange = useMemo(() => (
	// 	value: number
	// ) => {
	// 	if (audioAttributes?.howl) {
	// 		audioAttributes?.howl.seek(value);
	// 		setTrackPosition(value);
	// 	}
	// }, [audioAttributes?.howl]);
	//
	// useEffect(() => {
	// 	let intervalId: NodeJS.Timeout | null = null;
	//
	// 	if (audioAttributes?.howl) {
	// 		if (audioAttributes.howl.playing()) {
	// 			intervalId = setInterval(() => {
	// 				const currentPosition = audioAttributes.howl?.seek();
	// 				setTrackPosition(currentPosition || 0);
	// 			}, 1);
	// 		}
	// 	}
	//
	// 	return () => {
	// 		if (intervalId) clearInterval(intervalId);
	// 	};
	// }, [audioAttributes?.howl, trackPosition]);

	const handleSliderChange = useMemo(() => (
		value: number
	) => {
		if (audioAttributes?.howl) {
			audioAttributes?.howl.seek(value);

			setAudioAtrributes.mutate({
				position: audioAttributes?.howl?.seek()
			})
		}
	}, [audioAttributes?.howl, setAudioAtrributes]);

	return {
		handleSliderChange
	}
}