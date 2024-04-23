"use client"

import { Typography } from "@/ui/typography";
import { useCallback } from "react";
import { useSongByTitleQuery } from "@/lib/query/song/song-by-title-query";
import { SearchPageTopResult } from "@/components/lists/search/components/search-page-top-result";
import { SearchPageTracksList } from "@/components/lists/search/components/search-page-tracks-list";

export const SearchContent = ({
	title
}: {
	title: string
}) => {
	const { data: searchedSongs } = useSongByTitleQuery(title, 4);

	const calcMatchSongs = useCallback(() => {
		if (!searchedSongs || searchedSongs.length === 0) return null;

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
	}, [searchedSongs, title]);

	const topResult = calcMatchSongs();

	if (!title) return;

	return (
		<div className="flex w-full h-full gap-x-4 justify-between">
			<div className="flex gap-y-2 flex-col w-1/3">
				<Typography className="text-3xl !font-bold">
					Top result
				</Typography>
				{topResult && (
					<SearchPageTopResult song={topResult}/>
				)}
			</div>
			<div className="flex gap-y-2 flex-col w-2/3">
				<Typography className="text-3xl !font-bold">
					Songs
				</Typography>
				{searchedSongs && (
					<SearchPageTracksList searchedSongs={searchedSongs}/>
				)}
			</div>
		</div>
	);
}