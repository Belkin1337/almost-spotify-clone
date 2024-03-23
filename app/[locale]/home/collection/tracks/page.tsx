import { FollowTracksList } from "@/components/lists/followed/follow-tracks";
import { cookies } from "next/headers";
import { createClient } from "@/lib/utils/supabase/server";
import { redirect } from "next/navigation";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { prefetchQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { getFollowedSongs } from "@/lib/queries/get-followed-songs";

export default async function FollowedSongsPage() {
  const cookieStore = cookies()
  const queryClient = new QueryClient()
  const supabase = createClient(cookieStore)
  const { data: {
    user
  }, error } = await supabase.auth.getUser()

  await prefetchQuery(queryClient, getFollowedSongs(supabase, user?.id!))

  if (error || !user) {
    redirect('/home')
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FollowTracksList userId={user.id} />
    </HydrationBoundary>
  );
}