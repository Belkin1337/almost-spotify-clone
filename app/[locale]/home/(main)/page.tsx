import { setStaticParamsLocale } from 'next-international/server';
import { FollowedTracksButton } from '@/components/buttons/follow/redirect-follow-list-button'
import { MainTracksList } from '@/components/lists/main/main-tracks';
import { getScopedI18n } from '@/locales/server';
import { getSongsAll } from '@/lib/queries/get-songs';
import { cookies } from 'next/headers';
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { createClient } from '@/lib/utils/supabase/server';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

export default async function HomeMainPage({ 
  params: { locale } 
}: { 
  params: { locale: string } 
}) {
  const cookieStore = cookies()
  const queryClient = new QueryClient()
  const supabase = createClient(cookieStore)
  setStaticParamsLocale(locale);

  const { data: { 
    user 
  } } = await supabase.auth.getUser()

  await prefetchQuery(queryClient, getSongsAll(supabase))
  
  const mainPageLocale = await getScopedI18n('main-service.pages.main-content.navbar')
  const configLocale = await getScopedI18n('main-service.pages.liked-content.navbar')

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {user && (
        <div className="mb-2 p-4">
          <h1 className="text-white text-4xl font-semibold">
            {mainPageLocale('welcome-message')}
          </h1>
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cold-3 2xl:grid-cols-4 gap-3 mt-4">
            <FollowedTracksButton
              name={configLocale('subtitle-message')}
              image="/images/liked.png"
              href="/home/collection/tracks"
            />
          </div> */}
        </div>
      )}
      <div className="flex justify-between items-center px-4">
        <h1 className="text-white text-2xl font-semibold">
          {mainPageLocale('recommended-message')}
        </h1>
      </div>
      <MainTracksList />
    </HydrationBoundary>
  )
}