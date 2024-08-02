import { cookies } from "next/headers";
import { createClient } from "@/lib/utils/supabase/server/supabase-server";
import { redirect } from "next/navigation";
import { Wrapper } from "@/ui/wrapper";
import { SearchRecentArtistsList } from "@/components/search/recent/artists/search-recent-artists-list";
import { SearchGenres } from "@/components/search/genres/components/search-genres";
import { SearchSimilarResults } from "@/components/search/result/similar/components/search-similar-results";

export default async function SearchPage({
	searchParams
}: {
	searchParams: { title: string }
}) {
	const supabase = createClient(cookies())
	const { data: { user }, error } = await supabase.auth.getUser()

	if (error || !user) redirect('/home')

	return (
		<Wrapper variant="page">
			<div className="p-6 w-full h-full">
				{!searchParams.title ? (
					<div className="flex flex-col w-full gap-y-2">
						<SearchRecentArtistsList type="sliced"/>
						<SearchGenres/>
					</div>
				) : <SearchSimilarResults title={searchParams.title}/>
				}
			</div>
		</Wrapper>
	)
}