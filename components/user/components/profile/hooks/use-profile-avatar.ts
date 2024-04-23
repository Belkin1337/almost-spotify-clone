import { getUserAvatar } from "@/lib/queries/user/get-user-avatar";
import { nullAvatarImage } from "@/lib/constants/files/invalid-or-null-images";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";

const supabase = createClient();

export const useProfileAvatar = () => {
	const downloadImage = async (userId: string) => {
		const { data, error } = await getUserAvatar(supabase, userId);

		if (error) {
			return nullAvatarImage;
		}

		const url = URL.createObjectURL(data);
		return url;
	}

	return {
		downloadImage
	}
}