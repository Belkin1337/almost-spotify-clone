import { useCallback } from "react";
import { Howl } from "howler";
import { useAudio } from "@/components/player/hooks/use-audio";
import { useAudioStateQuery } from "@/lib/query/player/audio-state-query";
import { usePlayer } from "@/components/player/hooks/use-player";
import { usePlayerStateQuery } from "@/lib/query/player/player-state-query";
import { useUnloadHowl } from "@/lib/hooks/player/use-unload-howl";
import { useUserQuery } from "@/lib/query/user/user-query";

export const useHowler = () => {
	const { data: user } = useUserQuery()
	const { setAudioAtrributes } = useAudio()
	const { setPlayerAttributes } = usePlayer()
	const { audioAttributes } = useAudioStateQuery()
	const { playerAttributes } = usePlayerStateQuery()
	const { unload } = useUnloadHowl();

	const currentSong = playerAttributes.active;
	const currentSongArray = playerAttributes.ids!;
	const currentIdx = currentSongArray.findIndex(song => song.id === currentSong?.id)
	const nextIdx = (currentIdx + 1) % currentSongArray.length;
	const nextSong = currentSongArray[nextIdx];

	const createHowlInstance = useCallback(({
		songUrl
	}: {
		songUrl: string
	}) => {
		if (user) {
			unload();

			if (songUrl && songUrl !== audioAttributes?.songUrl) {
				const newHowl = new Howl({
					src: songUrl,
					autoplay: true,
					format: ["mp3"],
					html5: true,
					onplay: () => {
						setPlayerAttributes.mutate({
							isPlaying: true
						});
					},
					onpause: () => {
						setPlayerAttributes.mutate({
							isPlaying: false
						});
					},
					onend: () => {
						setPlayerAttributes.mutate({
							active: nextSong,
							ids: currentSongArray,
							isPlaying: true,
						});
					},
					onload: () => {
						setPlayerAttributes.mutate({
							isLoaded: true,
							duration: newHowl?.duration()
						});
					}
				})

				setAudioAtrributes.mutate({
					howl: newHowl,
					position: newHowl.duration()
				})
			}
		} else {
			unload();
		}
	}, [user, audioAttributes.songUrl, nextSong])

	return { createHowlInstance }
}