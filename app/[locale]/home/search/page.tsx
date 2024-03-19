import { SearchInput } from "@/components/inputs/search-input";
import { SearchContent } from "@/components/lists/search-tracks";
import { getScopedI18n } from "@/locales/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/utils/supabase/server";
import { redirect } from "next/navigation";
import { Wrapper } from "@/ui/wrapper";
// import { QueryClient } from "@tanstack/react-query";
// import { prefetchQuery } from "@supabase-cache-helpers/postgrest-react-query";

interface SearchProps {
  searchParams: {
    title: string
  }
}

export default async function Search({ 
  searchParams 
}: SearchProps) {
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
      <div className="flex flex-col gap-y-6 p-4">
        <h1 className="text-white text-4xl font-semibold">
          {searchLocale('navbar.welcome-message')}
        </h1>
        <SearchInput />
      </div>
      <SearchContent title={searchParams.title} />
    </Wrapper>
  )
}