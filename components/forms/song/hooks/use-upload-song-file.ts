import uniqid from "uniqid";
import { useMutation } from "@tanstack/react-query";
import { useScopedI18n } from "@/locales/client";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { sanitizeName } from "@/lib/helpers/sanitaze-name";
import { SongAttributes } from "@/types/song";

const supabase = createClient();
const uniqueID = uniqid();

export function useUploadSongFile() {
	const uploadModalLocale = useScopedI18n("main-service.main-part.config");

	const createSongFileMutation = useMutation({
		mutationFn: async (
			values: SongAttributes
		) => {
			if (values.song) {
				const title = sanitizeName(values.title ? values.title : '');

				const { data: songData, error: songErr } = await supabase.storage
					.from("songs")
					.upload(`song-${title}-${uniqueID}`, values.song, {
						upsert: true,
						contentType: "fileBody"
					});

				if (songErr) return;

				return songData;
			}
		}
	});

	return { createSongFileMutation }
}