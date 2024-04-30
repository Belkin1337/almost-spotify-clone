import { useMutation, useQueryClient } from "@tanstack/react-query";
import { playerStateQueryKey } from "@/lib/querykeys/player-state";
import { PlayerAttributesType } from "@/lib/query/player/player-state-query";

export const usePlayer = () => {
	const queryClient = useQueryClient()

	const setPlayerAttributes = useMutation({
		mutationFn: async (
			newAttributes: PlayerAttributesType
		) => {
			return queryClient.setQueryData<PlayerAttributesType>(
				playerStateQueryKey,
				(prev) => {
					return { ...prev, ...newAttributes }
				}
			)
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: playerStateQueryKey
			});
		}
	})

	return { setPlayerAttributes }
}