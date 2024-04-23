import { Typography } from "@/ui/typography";
import { SongEntity } from "@/types/song";
import { SearchSongItem } from "@/components/song/components/search/search-song-item";

export const SearchPageTracksList = ({
	searchedSongs
}: {
	searchedSongs: SongEntity[]
}) => {
	return (
		<div className="flex flex-col w-full">
			{searchedSongs ? (
				searchedSongs.map((song, idx) => (
					<div key={song.id} className="flex items-center gap-x-4 w-full">
						<div className="flex-1">
							<SearchSongItem
								song={song}
								song_list={{
									data: searchedSongs,
									id: String(idx + 1)
								}}
							/>
						</div>
					</div>
				))) : (
				<div className="flex flex-col gap-y-2 w-full px-4 text-neutral-400">
					<Typography>
						Ничего не найдено.
					</Typography>
				</div>
			)}
		</div>
	)
}