import { Wrapper } from "@/ui/wrapper";
import { Typography } from "@/ui/typography";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
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