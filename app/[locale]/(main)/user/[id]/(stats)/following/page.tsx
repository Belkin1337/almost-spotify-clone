import { Wrapper } from "@/ui/wrapper";
import { Typography } from "@/ui/typography";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { UserStatsFollowing } from "@/components/user/components/stats/following/user-stats-following";
import { PageTypes } from "@/types/page-convention";

export default async function ProfileFollowingListPage({
	params
}: PageTypes) {
	const { id } = await params;
	const qc = new QueryClient();

	return (
		<HydrationBoundary state={dehydrate(qc)}>
			<Wrapper variant="page">
				<div className="flex flex-col gap-y-6 p-6">
					<Typography variant="page_title">
						Following
					</Typography>
					<div className="flex w-full h-full">
						<UserStatsFollowing userId={id}/>
					</div>
				</div>
			</Wrapper>
		</HydrationBoundary>
	)
}