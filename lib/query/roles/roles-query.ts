import { useQuery } from "@tanstack/react-query";
import { getAllRoles } from "@/lib/queries/roles/multiple/get-all-roles";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";

const supabase = createClient();

export const useRolesQuery = () => {
	return useQuery({
		queryKey: ["roles"],
		queryFn: async () => {
			const { data, error } = await getAllRoles(supabase)

			if (error) return;

			return data;
		},
		staleTime: Infinity,
		gcTime: Infinity,
		retry: 1,
	})
}