import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getSingleById } from "@/lib/queries/single/single/get-single-by-id";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";

const supabase = createClient();

export const useSingleQuery = (
	singleId: string
) => {
	return useQuery({
		queryKey: ["single", singleId],
		queryFn: async () => {
			const { data, error } = await getSingleById(supabase, singleId)

			if (error) return;

			return data;
		},
		placeholderData: keepPreviousData,
		retry: 1
	})
}