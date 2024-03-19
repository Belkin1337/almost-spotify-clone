import { ArtistProfileItem } from "@/components/artist/profile";
import { createClient } from "@/lib/utils/supabase/server";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomeArtistPage({
  params
}: {
  params: { id: string }
}) {
  const queryClient = new QueryClient();
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: {
    user
  }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/home')
  }
  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ArtistProfileItem />
    </HydrationBoundary>
  )
}