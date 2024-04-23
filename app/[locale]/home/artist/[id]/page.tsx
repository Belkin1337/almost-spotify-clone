import { ArtistProfile } from "@/components/artist/profile/components/artist-profile";
import { createClient } from "@/lib/utils/supabase/server/supabase-server";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Wrapper } from "@/ui/wrapper";

export default async function ArtistPage({
  params
}: {
  params: { id: string }
}) {
  const queryClient = new QueryClient();
  const supabase = createClient(cookies())

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) redirect('/home');
  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Wrapper variant="page">
        <ArtistProfile artistId={params.id} />
      </Wrapper>
    </HydrationBoundary>
  )
}