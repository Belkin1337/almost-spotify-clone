import { ArtistEntity } from "@/types/artist";
import { SongEntity } from "@/types/song";
import {
	ORDER_TYPE_AT_FIRST,
	ORDER_TYPE_FROM_THE_END, SONGS_TYPE_ALL, SONGS_TYPE_BY_ARTIST,
	VIEW_TYPE_COMPACT,
	VIEW_TYPE_GRID,
	VIEW_TYPE_LIST
} from "@/types/ui";

export interface IUserTracksList {
	artists?: ArtistEntity[],
	sortType: SortType,
	isLoading: boolean,
	handleSort: (
		type: 'orderType' | 'viewType' | 'songsType' | "setArtist",
		value: OrderType | ViewType | SongsType | string
	) => void;
	userSongs?: SongEntity[]
}

export type SortType = {
	viewType?: ViewType,
	orderType?: OrderType,
	songsType?: SongsType,
	selectedArtistId?: string
}

export type ViewType = typeof VIEW_TYPE_COMPACT | typeof VIEW_TYPE_LIST | typeof VIEW_TYPE_GRID;
export type OrderType = typeof ORDER_TYPE_AT_FIRST | typeof ORDER_TYPE_FROM_THE_END;
export type SongsType = typeof SONGS_TYPE_ALL | typeof SONGS_TYPE_BY_ARTIST;