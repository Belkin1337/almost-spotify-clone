import { SearchContent } from "@/components/lists/search/search-tracks";
import { getScopedI18n } from "@/locales/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/utils/supabase/server";
import { redirect } from "next/navigation";
import { Wrapper } from "@/ui/wrapper";
import { SearchArtistList } from "@/components/lists/search/child/artist-list";
import { SearchGenreList } from "@/components/lists/search/child/genre-list";
// import { QueryClient } from "@tanstack/react-query";
// import { prefetchQuery } from "@supabase-cache-helpers/postgrest-react-query";

export default async function SearchPage({
  searchParams
}: {
  searchParams: { title: string }
}) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: {
    user
  }, error } = await supabase.auth.getUser()

  const searchLocale = await getScopedI18n('main-service.pages.search-content')

  if (error || !user) {
    redirect('/home')
  }

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
            <SearchArtistList type="sliced" />
            <SearchGenreList />
          </div>
        ) : (
          <SearchContent title={searchParams.title} />
        )}
      </div>
    </Wrapper>
  )
}