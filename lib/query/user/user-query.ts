"use client"

import { useQuery, QueryKey } from "@tanstack/react-query";
import { getUserById } from "@/lib/query/user/get-user";
import { UserEntity } from "@/types/user";

export const USER_QUERY_KEY: QueryKey = [ "user" ]

export const useUserQuery = (id: string) => useQuery<UserEntity>({
	queryKey: USER_QUERY_KEY,
	queryFn: async() => getUserById(id),
	retry: 1,
	refetchOnWindowFocus: false
})