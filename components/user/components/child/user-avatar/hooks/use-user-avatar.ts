import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { getUserAvatar } from "@/lib/queries/user/get-user-avatar";
import { nullAvatarImage } from "@/lib/constants/files/invalid-or-null-images";
import { userAvatarQueryKey } from "@/lib/querykeys/user";

const supabase = createClient();

export const useUserAvatar = (
	userId: string
) => {
	return useQuery({
		queryKey: userAvatarQueryKey(userId),
		queryFn: async () => {
			const { data, error } = await getUserAvatar(supabase, userId);

			if (error || 'error' in data) return nullAvatarImage;

			const avatarUrl = URL.createObjectURL(data);

			return avatarUrl
		},
		retry: 1,
		refetchOnWindowFocus: false
	})
}