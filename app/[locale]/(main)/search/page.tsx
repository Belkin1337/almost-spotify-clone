import { Wrapper } from "@/ui/wrapper";
import { SearchRecentArtistsList } from "@/components/search/recent/artists/search-recent-artists-list";
import { SearchGenres } from "@/components/search/genres/components/search-genres";
import { SearchSimilarResults } from "@/components/search/result/similar/components/search-similar-results";
import { getUser } from "@/lib/helpers/get-user";

type SearchPageProps = {
	searchParams: Promise<{ title: string }>
}

export default async function SearchPage({
	searchParams
}: SearchPageProps) {
	const { title } = await searchParams;
	await getUser()
	
	return (
		<Wrapper variant="page">
			<div className="p-6 w-full h-full">
				{!title ? (
					<div className="flex flex-col w-full gap-y-2">
						<SearchRecentArtistsList type="sliced"/>
						<SearchGenres/>
					</div>
				) : <SearchSimilarResults title={title}/>}
			</div>
		</Wrapper>
	)
}