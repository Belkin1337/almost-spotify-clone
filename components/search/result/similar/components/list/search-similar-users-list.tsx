import { UserEntity } from "@/types/user";
import { UserCard } from "@/components/user/components/card/components/user-card";

export const SearchSimilarUsersList = ({
	searchedUsers
}: {
	searchedUsers: UserEntity[]
}) => {
	return (
		<div className="flex items-center gap-1 w-full">
			{searchedUsers.slice(0, 8).map(user => (
				<UserCard
					user={user}
					key={user.id}
				/>
			))}
		</div>
	)
}