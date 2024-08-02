"use client"

import { Typography } from "@/ui/typography";
import { SearchSimilarUsersList } from "@/components/search/result/similar/components/list/search-similar-users-list";
import { UserEntity } from "@/types/user";

type SearchSimilarUsersProps = Partial<{
	searchedUsers: UserEntity[]
}>

export const SearchSimilarUsers = ({
	searchedUsers
}: SearchSimilarUsersProps) => {
	if (!searchedUsers?.length) return;

	return (
		<div className="flex gap-y-2 flex-col w-2/3">
			<Typography className="text-2xl" font="bold">
				Profiles
			</Typography>
			{searchedUsers && (<SearchSimilarUsersList searchedUsers={searchedUsers}/>)}
		</div>
	)
}