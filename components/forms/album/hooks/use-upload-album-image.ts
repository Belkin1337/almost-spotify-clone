import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import uniqid from "uniqid";
import { AlbumAttributes } from "@/components/forms/album/hooks/use-create-album";

const supabase = createClient();
const uniqueID = uniqid();

export const useUploadAlbumImage = () => {
	const uploadAlbumImage = useMutation({
		mutationFn: async (
			values: AlbumAttributes
		) => {
			try {
				const { data: imageData, error } = await supabase
					.storage
					.from("images")
					.upload(`image-${values.title}-${uniqueID}`, values.image_url, {
						upsert: true,
						contentType: "fileBody",
					});

				if (error) {
					console.log(error.message)
					throw error;
				}

				return imageData;
			} catch (e) {
				throw e;
			}
		},
	});

	return {
		uploadAlbumImage
	}
}