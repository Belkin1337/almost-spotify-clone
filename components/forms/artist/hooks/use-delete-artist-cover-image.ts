import { useMutation } from "@tanstack/react-query";
import { ArtistAttributes } from "@/components/forms/artist/hooks/use-create-artist";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";

const supabase = createClient();

export const useDeleteArtistCoverImage = () => {
	const deleteArtistCoverImage = useMutation({
		mutationFn: async (values: ArtistAttributes) => {
			if (values.cover_image_path) {
				const { data: deletedSongImage, error } = await supabase
					.storage
					.from("images")
					.remove([values.cover_image_path])

				if (!error) {
					return deletedSongImage;
				} else {
					return;
				}
			}
		}
	})

	return {
		deleteArtistCoverImage
	}
}