import { FollowTracksList } from "@/components/lists/follow-tracks-list";
import { getScopedI18n } from "@/locales/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/utils/supabase/server";
import { redirect } from "next/navigation";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { prefetchQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { getFollowedSongs } from "@/lib/queries/get-followed-songs";
import Image from "next/image";

export default async function Liked() {
  const likedPageLocale = await getScopedI18n('main-service.pages.liked-content.navbar')
  const cookieStore = cookies()
  const queryClient = new QueryClient()
  const supabase = createClient(cookieStore)
  const { data: { user }, error } = await supabase.auth.getUser()

  await prefetchQuery(queryClient, getFollowedSongs(supabase, user?.id!))

  if (error || !user) {
    redirect('/home')
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="py-16 p-6 bg-gradient-to-b from-violet-700/90 to-violet-300/10">
        <div className="flex flex-col md:flex-row items-center gap-x-5">
          <div className="relative h-32 w-32 lg:h-44 lg:w-44">
            <Image fill src="/images/liked.png" alt="Playlist" className="rounded-md object-cover" loading="lazy" />
          </div>
          <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
            <p className="hidden md:block text-white font-semibold text-xl">
              {likedPageLocale('welcome-message')}
            </p>
            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold">
              {likedPageLocale('subtitle-message')}
            </h1>
          </div>
        </div>
      </div>
      <FollowTracksList userid={user.id}/>
    </HydrationBoundary>
  );
}