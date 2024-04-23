import { SongEntity } from "@/types/song";

type PlayButtonVariantsType = {
	variant: "default"
		| "single_medium"
		| "single_page"
		| "form"
		| "album_playlist"
		| null
		| undefined
}

export interface IPlayButton
	extends PlayButtonVariantsType {
	song: SongEntity,
	song_list?: SongEntity[]
}