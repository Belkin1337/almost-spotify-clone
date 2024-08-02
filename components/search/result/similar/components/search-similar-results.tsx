"use client"


import { useSongByTitleQuery } from "@/lib/query/song/songs-by-title-query";
import { useArtistsByNameQuery } from "@/lib/query/artist/artists-by-title-query";
import { useUsersByTitleQuery } from "@/lib/query/user/users-by-title-query";
import { Typography } from "@/ui/typography";
import { SearchNavigationBar } from "@/components/search/navigation/components/search-navigation-bar";
import dynamic from "next/dynamic";

const SearchSimilarTracks = dynamic(() => import("@/components/search/result/similar/components/search-similar-tracks")
	.then(mod => mod.SearchSimilarTracks));

const SearchSimilarArtists = dynamic(() => import("@/components/search/result/similar/components/search-similar-artists")
	.then(mod => mod.SearchSimilarArtists));

const SearchSimilarUsers = dynamic(() => import("@/components/search/result/similar/components/search-similar-users")
	.then(mod => mod.SearchSimilarUsers));

type NotFoundedResultsProps = {
	title: string
}

const NotFoundedResults = ({
	title
}: NotFoundedResultsProps) => {
	return (
		<div className="flex flex-col items-center justify-center gap-y-4">
			<Typography>
				{/* eslint-disable-next-line react/no-unescaped-entities */}
				No results found for "{title}"
			</Typography>
			<Typography>
				Please make sure your words are spelled correctly, or use fewer or different keywords.
			</Typography>
		</div>
	)
}

export const SearchSimilarResults = ({
	title
}: NotFoundedResultsProps) => {
	const { data: searchedSongs } = useSongByTitleQuery(title, 4);
	const { data: searchedArtists } = useArtistsByNameQuery(title, 8);
	const { data: searchedUsers } = useUsersByTitleQuery(title);

	if (!title) return;

	if (!searchedUsers?.length && !searchedSongs?.length && !searchedArtists?.length) {
		return <NotFoundedResults title={title}/>
	}

	return (
		<div className="flex flex-col gap-y-6 w-full h-full">
			<SearchNavigationBar />
			<SearchSimilarTracks title={title} searchedSongs={searchedSongs}/>
			<SearchSimilarArtists searchedArtists={searchedArtists}/>
			<SearchSimilarUsers searchedUsers={searchedUsers}/>
		</div>
	)
}