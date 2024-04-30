import { Wrapper } from "@/ui/wrapper";
import { Typography } from "@/ui/typography";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { followedArtistQueryKey } from "@/lib/querykeys/artist";
import { getFollowedArtists } from "@/lib/queries/artist/multiple/get-followed-artists";
import { createClient } from "@/lib/utils/supabase/server/supabase-server";
import { cookies } from "next/headers";
import { UserStatsFollowing } from "@/components/user/components/stats/following/user-stats-following";

export default async function ProfileFollowingListPage({
	params
}: {
	params: { id: string }
}) {
	const supabase = createClient(cookies())
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		// eslint-disable-next-line @tanstack/query/exhaustive-deps
		queryKey: followedArtistQueryKey(params.id),
		queryFn: () => getFollowedArtists(supabase, params.id)
	})

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Wrapper variant="page">
				<div className="flex flex-col gap-y-6 p-6">
					<Typography variant="page_title">
						Following
					</Typography>
					<div className="flex w-full h-full">
						<UserStatsFollowing userId={params.id}/>
					</div>
				</div>
			</Wrapper>
		</HydrationBoundary>
	)
}