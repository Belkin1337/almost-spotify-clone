import { useQuery } from "@tanstack/react-query";
import { volumeStateQueryKey } from "@/lib/querykeys/player-state";

export interface VolumeAttributeType {
	volume?: number
}

export const initialVolumeAttribute: VolumeAttributeType = {
	volume: 1
}

export const useVolumeStateQuery = () => {
	const { data: volumeAttribute } = useQuery({
		queryKey: volumeStateQueryKey,
		initialData: initialVolumeAttribute,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false
	})

	return {
		volumeAttribute
	}
}