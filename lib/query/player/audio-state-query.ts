import { useQuery } from "@tanstack/react-query";
import { audioStateQueryKey } from "@/lib/querykeys/player-state";

export interface AudioAttributesType {
	position?: number,
	howl?: Howl | null,
	songUrl?: string | null
}

export const initialAudioAtrb: AudioAttributesType = {
	howl: null,
	songUrl: null,
	position: 0,
}

export const useAudioStateQuery = () => {
	const { data: audioAttributes } = useQuery<AudioAttributesType, Error>({
		queryKey: audioStateQueryKey,
		initialData: initialAudioAtrb,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		refetchOnMount: false
	});

	return {
		audioAttributes
	}
}