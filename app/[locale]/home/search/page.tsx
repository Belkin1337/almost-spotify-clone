import { SearchContent } from "@/components/lists/search/components/search-page-tracks";
import { getScopedI18n } from "@/locales/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/utils/supabase/server/supabase-server";
import { redirect } from "next/navigation";
import { Wrapper } from "@/ui/wrapper";
import { SearchArtistList } from "@/components/lists/search/components/search-page-artist-list";
import { SearchGenreList } from "@/components/lists/search/components/search-page-genre-list";

export default async function SearchPage({
	searchParams
}: {
	searchParams: { title: string }
}) {
	const supabase = createClient(cookies())

	const { data: { user }, error } = await supabase.auth.getUser()

	const searchLocale = await getScopedI18n('main-service.pages.search-content')

	if (error || !user) redirect('/home')

	return (
		<Wrapper variant="page">
			{/* <div className="flex flex-col gap-y-6 p-4">
        <h1 className="text-white text-4xl font-semibold">
          {searchLocale('navbar.welcome-message')}
        </h1>
      </div> */}
			<div className="p-6 w-full h-full">
				{!searchParams.title ? (
					<div className="flex flex-col w-full gap-y-2">
						<SearchArtistList type="sliced"/>
						<SearchGenreList/>
					</div>
				) : (
					<div className="flex flex-col w-full h-full">
						<SearchContent title={searchParams.title}/>
						<div className="flex flex-wrap gap-2 items-center">

						</div>
					</div>
				)}
			</div>
		</Wrapper>
	)
}