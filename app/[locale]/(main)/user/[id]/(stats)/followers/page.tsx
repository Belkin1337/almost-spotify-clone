import { Wrapper } from "@/ui/wrapper";
import { Typography } from "@/ui/typography";

export default async function ProfileFollowersListPage({
	params
}: {
	params: { id: string }
}) {
	return (
		<Wrapper variant="page">
			<div className="flex flex-col gap-y-6">
				<Typography variant="page_title">
					Followers
				</Typography>
				<div className="flex flex-wrap w-full h-full">

				</div>
			</div>
		</Wrapper>
	)
}