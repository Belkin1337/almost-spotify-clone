import { SongEntity } from "@/types/song";

type CalcSimilarResults = {
	searchedSongs: SongEntity[] | undefined,
	title: string
}

export const useCalcSimilarResults = ({
	searchedSongs, title
}: CalcSimilarResults) => {
	if (!searchedSongs || searchedSongs.length === 0) return;

	let bestMatch = searchedSongs[0];
	let minDifference = Math.abs(searchedSongs[0].title.length - title.length);

	for (const song of searchedSongs) {
		const difference = Math.abs(song.title.length - title.length);

		if (difference < minDifference) {
			minDifference = difference;
			bestMatch = song;
		}
	}

	return bestMatch;
}