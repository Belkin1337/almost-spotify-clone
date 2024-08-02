import { useMutation, useQueryClient } from "@tanstack/react-query";
import { audioStateQueryKey } from "@/lib/querykeys/player-state";
import { AudioAttributesType } from "@/lib/query/player/audio-state-query";

export const useAudio = () => {
	const qc = useQueryClient()

	const setAudioAttributes = useMutation({
		mutationFn: async (
			newAttributes: AudioAttributesType
		) => {
			return qc.setQueryData<AudioAttributesType>(
				audioStateQueryKey,
				(prev) => {
					return { ...prev, ...newAttributes }
				}
			)
		},
		onSuccess: async () => {
			await qc.invalidateQueries({ queryKey: audioStateQueryKey });
		},
		onError: (e) => { throw new Error(e.message) }
	})

	return { setAudioAttributes }
}