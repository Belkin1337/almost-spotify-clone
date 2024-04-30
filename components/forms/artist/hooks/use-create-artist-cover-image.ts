import { useMutation } from "@tanstack/react-query";
import { ArtistAttributesType } from "@/components/forms/artist/hooks/use-create-artist";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import uniqid from "uniqid";

const supabase = createClient();
const uniqueID = uniqid();

export const useCreateArtistCoverImage = () => {
	const uploadArtistCoverImageMutation = useMutation({
		mutationFn: async (values: ArtistAttributesType) => {
			if (values.cover_image) {
				try {
					const {data: imageCoverData, error} = await supabase
						.storage
						.from("images")
						.upload(`cover_image-${values.name}-${uniqueID}`, values.cover_image, {
							upsert: true,
							contentType: "fileBody"
						})

					if (error) return;

					return imageCoverData;
				} catch (e) {
					throw e;
				}
			}
		}
	})

	return { uploadArtistCoverImageMutation }
}