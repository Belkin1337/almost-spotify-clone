import { cookies } from "next/headers";
import { createClient } from "@/lib/utils/supabase/server/supabase-server";
import { redirect } from "next/navigation";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getFollowedSongs } from "@/lib/queries/song/multiple/get-followed-songs";
import { followedSongsQueryKey } from "@/lib/querykeys/song";
import { Wrapper } from "@/ui/wrapper";
import { ColoredBackground } from "@/ui/colored-background";
import { FollowedTracksPreview } from "@/components/lists/followed/components/followed-tracks-preview";
import { FollowedTracksList } from "@/components/lists/followed/components/followed-tracks-list";

export default async function FollowedSongsPage() {
  const queryClient = new QueryClient()
  const supabase = createClient(cookies())

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) redirect('/home')

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
			<Wrapper variant="page">
				<ColoredBackground color="#5b21b6"/>
				<FollowedTracksPreview userId={user.id}/>
				<div className="flex flex-col bg-black/20 backdrop-filter backdrop-blur-md min-h-screen h-full">
					<FollowedTracksList userId={user.id}/>
				</div>
			</Wrapper>
    </HydrationBoundary>
  );
}