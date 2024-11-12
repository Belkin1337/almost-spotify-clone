import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getFollowedUsers } from "@/lib/queries/user/multiple/get-followed-users";
import { userFollowers } from "@/lib/querykeys/user";

export const useFollowedUsersQuery = (
	userId: string
) => useQuery({
	queryKey: userFollowers(userId),
	queryFn: async() => getFollowedUsers(userId),
	enabled: !!userId,
	refetchOnWindowFocus: false,
	placeholderData: keepPreviousData,
	refetchOnMount: false
})