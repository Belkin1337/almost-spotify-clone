import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { ArtistAttributes } from "@/components/forms/artist/hooks/use-create-artist";

const supabase = createClient();

export const useDeleteArtistImage = () => {
	const deleteArtistImage = useMutation({
		mutationFn: async (values: ArtistAttributes) => {
			if (values.avatar_path) {
				const { data: deletedSongImage, error } = await supabase
					.storage
					.from("images")
					.remove([values.avatar_path])

				if (!error) {
					return deletedSongImage;
				} else {
					return;
				}
			}
		}
	})

	return {
		deleteArtistImage
	}
}