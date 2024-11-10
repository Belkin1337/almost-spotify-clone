import { useCallback } from "react";
import { Howl } from "howler";
import { useAudio } from "@/components/player/hooks/use-audio";
import { useAudioStateQuery } from "@/lib/query/player/audio-state-query";
import { usePlayer } from "@/components/player/hooks/use-player";
import { usePlayerStateQuery } from "@/lib/query/player/player-state-query";
import { USER_QUERY_KEY } from "@/lib/query/user/user-query";
import { UserEntity } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query"

export const useHowler = () => {
	const qc = useQueryClient();
	const user = qc.getQueryData<UserEntity>(USER_QUERY_KEY)
	const { setAudioAttributes } = useAudio()
	const { setPlayerAttributes } = usePlayer()
	const { audioAttributes } = useAudioStateQuery()
	const { playerAttributes } = usePlayerStateQuery()

	const currentSong = playerAttributes.active;
	const currentSongArray = playerAttributes.ids!;
	const currentIdx = currentSongArray.findIndex(song => song.id === currentSong?.id)
	const nextIdx = (currentIdx + 1) % currentSongArray.length;
	const nextSong = currentSongArray[nextIdx];
	const currentSongUrl = audioAttributes.songUrl;
	const howl = audioAttributes.howl;

	const createHowlInstance = useCallback(({
		songUrl
	}: {
		songUrl: string
	}) => {
		if (user) {
			if (howl && songUrl) {
				howl.unload();

				setAudioAttributes.mutate({
					howl: null,
					songUrl: null,
					position: 0
				})

				setPlayerAttributes.mutate({
					isPlaying: false,
					isLoaded: false,
					duration: 0
				})
			}

			if (songUrl && songUrl !== currentSongUrl && howl === null) {
				const newHowl = new Howl({
					src: songUrl,
					autoplay: true,
					format: ["mp3"],
					html5: true,
					onplay: () => setPlayerAttributes.mutate({ isPlaying: true }),
					onpause: () => setPlayerAttributes.mutate({ isPlaying: false }),
					onend: () => {
						setPlayerAttributes.mutate({
							active: nextSong,
							ids: currentSongArray,
							isPlaying: true,
						});
					},
					onload: () => {
						if (newHowl) {
							setPlayerAttributes.mutate({
								isLoaded: true,
								duration: newHowl?.duration()
							});
						}
					}
				})

				if (howl !== newHowl) {
					setAudioAttributes.mutate({
						howl: newHowl,
						position: newHowl.duration()
					})
				}
			}
		}
	}, [howl, user])

	return { createHowlInstance }
}