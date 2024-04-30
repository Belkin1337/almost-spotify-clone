import { useMutation, useQueryClient } from "@tanstack/react-query";
import { audioStateQueryKey } from "@/lib/querykeys/player-state";
import { AudioAttributesType } from "@/lib/query/player/audio-state-query";

export const useAudio = () => {
	const queryClient = useQueryClient()

	const setAudioAttributes = useMutation({
		mutationFn: async (
			newAttributes: AudioAttributesType
		) => {
			return queryClient.setQueryData<AudioAttributesType>(
				audioStateQueryKey,
				(prev) => {
					return { ...prev, ...newAttributes }
				}
			)
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: audioStateQueryKey
			});
		}
	})

	return { setAudioAttributes }
}