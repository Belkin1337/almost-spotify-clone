import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { getUserAvatar } from "@/lib/queries/user/single/get-user-avatar";
import { userAvatarQueryKey } from "@/lib/querykeys/user";

const supabase = createClient();

export const useUserAvatar = (
	userId?: string
) => {
	return useQuery({
		queryKey: userAvatarQueryKey(userId),
		queryFn: async () => await getUserAvatar(supabase, userId),
		retry: 1,
		refetchOnWindowFocus: false
	})
}