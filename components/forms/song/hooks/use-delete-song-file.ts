import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { SongAttributes } from "@/types/song";

const supabase = createClient();

export function useDeleteSongFile() {
	const deleteSongFile = useMutation({
		mutationFn: async (
			values: SongAttributes
		) => {
			if (values.song_path) {
				const { data: deleteSongFile, error } = await supabase
					.storage
					.from('songs')
					.remove([values?.song_path])

				if (!error) {
					return deleteSongFile
				} else {
					return;
				}
			}
		}
	})

	return {
		deleteSongFile
	}
}