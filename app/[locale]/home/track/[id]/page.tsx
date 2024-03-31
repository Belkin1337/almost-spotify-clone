import { SongItemPage } from "@/components/song/page/song-item";
import { getSongById } from "@/lib/queries/song/get-song-by-id";
import { createClient } from "@/lib/utils/supabase/server";
import { prefetchQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SongPage({
  params
}: {
  params: { id: string }
}) {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const supabase = createClient(cookieStore)

  const { data: {
    user
  } } = await supabase.auth.getUser()

  await prefetchQuery(queryClient, getSongById(supabase, params.id), {
    retry: false,
  })

  if (!user) {
    redirect('/home')
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SongItemPage songId={params.id} />
    </HydrationBoundary>
  )
}