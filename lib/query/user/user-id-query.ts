import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/lib/queries/user/single/get-user-by-id";
import { userByIdQueryKey } from "@/lib/querykeys/user";

export const useUserByIdQuery = (userId: string) => useQuery({
	queryKey: userByIdQueryKey(userId),
	queryFn: async() => getUserById(userId),
	refetchOnWindowFocus: false,
	retry: 1
})