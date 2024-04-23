import uniqid from "uniqid";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { useMutation } from "@tanstack/react-query";
import { useScopedI18n } from "@/locales/client";
import { useToast } from "../../../../lib/hooks/ui/use-toast";
import { SongAttributes } from "@/types/song";

const supabase = createClient();
const uniqueID = uniqid();

export function useUploadSongImage() {
	const { toast } = useToast();

	const uploadModalLocale = useScopedI18n("main-service.main-part.config");

	const createSongImageMutation = useMutation({
		mutationFn: async (
			values: SongAttributes
		) => {
			if (values.image) {
				try {
					const { data: imageData, error: imageErr } = await supabase
						.storage
						.from("images")
						.upload(`image-${values.title}-${uniqueID}`, values.image, {
							upsert: true,
							contentType: "fileBody"
						});

					if (imageErr) toast({
						title: uploadModalLocale("error.song-image-error"),
						description: imageErr.message,
					});

					return imageData;
				} catch (error) {
					throw error;
				}
			}
		},
	});

	return { createSongImageMutation }
}