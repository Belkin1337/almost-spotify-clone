import { useQuery } from "@tanstack/react-query";
import { playerStateQueryKey } from "@/lib/querykeys/player-state";
import { SongEntity } from "@/types/song";

export interface PlayerAttributesType {
	active?: SongEntity | null;
	ids?: SongEntity[];
	isLoaded?: boolean;
	isPlaying?: boolean,
	duration?: number
}

export const initialPlayerAtrb: PlayerAttributesType = {
	active: null,
	ids: [],
	isPlaying: false,
	isLoaded: false,
	duration: 0
}

export const usePlayerStateQuery = () => {
	const { data: playerAttributes } = useQuery<PlayerAttributesType, Error>({
		queryKey: playerStateQueryKey,
		initialData: initialPlayerAtrb,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		refetchOnMount: false
	});

	return { playerAttributes }
}