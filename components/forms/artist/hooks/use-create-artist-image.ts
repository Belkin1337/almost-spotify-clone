import { useMutation } from "@tanstack/react-query";
import { ArtistAttributesType } from "@/components/forms/artist/hooks/use-create-artist";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import uniqid from "uniqid";

const supabase = createClient();
const uniqueID = uniqid();

export const useCreateArtistImage = () => {
	const uploadArtistImageMutation = useMutation({
		mutationFn: async (values: ArtistAttributesType) => {
			if (values.avatar) {
				try {
					const { data: imageData, error } = await supabase
						.storage
						.from("images")
						.upload(`author_image-${values.name}-${uniqueID}`, values.avatar, {
							upsert: true,
							contentType: "fileBody"
						})

					if (error) return;

					return imageData;
				} catch (e) {
					throw e;
				}
			}
		}
	})

	return { uploadArtistImageMutation }
}