import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { SongAttributes } from "@/types/song";

const supabase = createClient();

export function useDeleteSongImage() {
	const deleteSongImage = useMutation({
		mutationFn: async (
			values: SongAttributes
		) => {
			if (values.image_path) {
				const { data: deletedSongImage, error } = await supabase
					.storage
					.from("images")
					.remove([values.image_path])

				if (!error) {
					return deletedSongImage;
				} else {
					return;
				}
			}
		}
	})

	return {
		deleteSongImage
	}
}