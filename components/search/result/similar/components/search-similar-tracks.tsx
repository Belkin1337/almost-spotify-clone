import { Typography } from "@/ui/typography";
import { SearchTopResult } from "@/components/search/result/top/search-top-result";
import { SearchSimilarTracksList } from "@/components/search/result/similar/components/list/search-similar-tracks-list";
import { useCalcSimilarResults } from "@/components/search/result/similar/hooks/use-calc-similar-results";
import { SongEntity } from "@/types/song";

type SearchSimilarTracksProps = {
	title: string,
	searchedSongs?: SongEntity[]
}

export const SearchSimilarTracks = ({
	title,
	searchedSongs
}: SearchSimilarTracksProps) => {
	const topResult = useCalcSimilarResults({
		searchedSongs: searchedSongs,
		title: title
	})

	if (!title || !searchedSongs?.length) return;

	return (
		<div className="flex w-full h-full gap-x-4 justify-between">
			<div className="flex gap-y-2 flex-col w-1/3">
				<Typography className="text-2xl" font="bold">
					Top result
				</Typography>
				{topResult && (<SearchTopResult song={topResult}/>)}
			</div>
			<div className="flex gap-y-2 flex-col w-2/3">
				<Typography className="text-2xl" font="bold" >
					Songs
				</Typography>
				{searchedSongs && (<SearchSimilarTracksList searchedSongs={searchedSongs}/>)}
			</div>
		</div>
	);
}