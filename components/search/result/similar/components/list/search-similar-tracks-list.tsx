import { SearchSongItem } from "@/components/song/components/search/search-song-item";
import { SongEntity } from "@/types/song";

export const SearchSimilarTracksList = ({
	searchedSongs
}: {
	searchedSongs: SongEntity[]
}) => {

	if (!searchedSongs) return;

	return (
		<div className="flex flex-col w-full">
			{searchedSongs.map((song,
				idx) => (
				<div key={song.id} className="flex items-center gap-x-4 w-full">
					<div className="flex-1">
						<SearchSongItem
							song={song}
							song_list={{ data: searchedSongs, id: String(idx + 1) }}
						/>
					</div>
				</div>
			))}
		</div>
	)
}