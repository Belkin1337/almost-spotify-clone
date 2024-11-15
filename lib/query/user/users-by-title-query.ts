import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUsersByName } from "@/lib/queries/user/multiple/get-users-by-name";

const USERS_BY_TITLE_QUERY_KEY = (name: string) => [ "users", "title", name ]

export const useUsersByTitleQuery = (
	name: string, count?: number
) => useQuery({
	queryKey: USERS_BY_TITLE_QUERY_KEY(name),
	queryFn: () => getUsersByName(name, count),
	placeholderData: keepPreviousData
})