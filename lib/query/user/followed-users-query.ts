import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getFollowedUsers } from "@/lib/queries/user/multiple/get-followed-users";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { userFollowers } from "@/lib/querykeys/user";

const supabase = createClient();

export const useFollowedUsersQuery = (
	userId: string
) => {
	return useQuery({
		queryKey: userFollowers(userId),
		queryFn: async () => {
			const { data, error } = await getFollowedUsers(supabase, userId)

			if (error) throw error;

			const users = data.map(item => item.users).flat();

			return users;
		},
		enabled: !!userId,
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData,
		refetchOnMount: false
	})
}