import { AlbumPageItem } from "@/components/album/album-item";
import { createClient } from "@/lib/utils/supabase/server";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AlbumPage({ 
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

  if (!user) {
    redirect('/home')
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AlbumPageItem albumId={params.id} />
    </HydrationBoundary>
  )
}