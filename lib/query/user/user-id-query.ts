import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/lib/queries/user/single/get-user-by-id";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { userByIdQueryKey } from "@/lib/querykeys/user";

const supabase = createClient();

export const useUserByIdQuery = (
	userId: string
) => {
	return useQuery({
		queryKey: userByIdQueryKey(userId),
		queryFn: async () => {
			const { data, error } = await getUserById(supabase, userId);

			if (error) throw error;

			return data;
		}
	})
}