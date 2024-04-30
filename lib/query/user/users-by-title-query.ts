import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUsersByName } from "@/lib/queries/user/multiple/get-users-by-name";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";

const supabase = createClient();

export const useUsersByTitleQuery = (
	name: string,
	count?: number
) => {
	return useQuery({
		queryKey: ["users", name, count],
		queryFn: async () => {
			const { data, error } = await getUsersByName(supabase, name, count)

			if (error) return;

			return data;
		},
		enabled: !!name,
		placeholderData: keepPreviousData
	})
}