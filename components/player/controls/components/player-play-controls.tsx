import { HTMLAttributes, useCallback } from "react";
import { usePlayerStateQuery } from "@/lib/query/player/player-state-query";
import { usePlayer } from "@/components/player/hooks/use-player";
import { useAudioStateQuery } from "@/lib/query/player/audio-state-query";
import { PlayIcon } from "@/ui/icons/play-icon";
import { PlayerPlayControlsButton } from "@/components/player/controls/components/player-play-controls-button";

interface IPlayerPlayControls
	extends HTMLAttributes<HTMLDivElement> {
	variant: "desktop" | "mobile",
	state: boolean,
}

export const PlayerPlayControls = ({
	variant,
	state,
}: IPlayerPlayControls) => {
	const { playerAttributes } = usePlayerStateQuery()
	const isLoaded = playerAttributes?.isLoaded;

	const { setPlayerAttributes } = usePlayer();
	const { audioAttributes } = useAudioStateQuery()

	const handleTogglePlay = useCallback(() => {
		setPlayerAttributes.mutate({
			isPlaying: !playerAttributes?.isPlaying
		})

		if (playerAttributes.isPlaying) {
			audioAttributes.howl?.pause()
		} else {
			audioAttributes.howl?.play()
		}
	}, [audioAttributes.howl, playerAttributes.isPlaying, setPlayerAttributes])

	return (
		<PlayerPlayControlsButton
			onClick={handleTogglePlay}
			variant={variant === 'desktop' ? 'desktop' : 'mobile'}
			type={isLoaded ? 'loaded' : 'not_loaded'}
		>
			<PlayIcon state={state} />
		</PlayerPlayControlsButton>
	)
}