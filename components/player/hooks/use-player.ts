import { useMutation, useQueryClient } from "@tanstack/react-query";
import { playerStateQueryKey } from "@/lib/querykeys/player-state";
import { PlayerAttributesType } from "@/lib/query/player/player-state-query";

export const usePlayer = () => {
	const qc = useQueryClient()

	const setPlayerAttributes = useMutation({
		mutationFn: async (
			newAttributes: PlayerAttributesType
		) => {
			return qc.setQueryData<PlayerAttributesType>(
				playerStateQueryKey,
				(prev) => {
					return { ...prev, ...newAttributes }
				}
			)
		},
		onSuccess: async () => {
			await qc.invalidateQueries({ queryKey: playerStateQueryKey });
		},
		onError: (e) => { throw new Error(e.message) }
	})

	return { setPlayerAttributes }
}