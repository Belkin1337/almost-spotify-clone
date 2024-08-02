import { Typography } from "@/ui/typography";
import { useFollowedUsersQuery } from "@/lib/query/user/followed-users-query";
import { UserCard } from "@/components/user/components/card/components/user-card";

export const UserSubsList = ({
	userId
}: {
	userId: string
}) => {
	const { data: userFollowers } = useFollowedUsersQuery(userId);

	if (!userFollowers?.length) return;

	return (
		<div className="flex relative flex-col gap-y-4">
			<div className="flex flex-col">
				<Typography className="text-2xl" font="semibold" text_color="white">
					Подписчики
				</Typography>
			</div>
			<div className="flex items-center gap-4 flex-wrap">
				{userFollowers.map(user => (
					<UserCard key={user.id} user={user}/>
				))}
			</div>
		</div>
	)
}