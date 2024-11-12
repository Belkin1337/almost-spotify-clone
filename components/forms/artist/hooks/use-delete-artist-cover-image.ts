import { useMutation } from "@tanstack/react-query";
import { ArtistAttributesType } from "@/components/forms/artist/hooks/use-create-artist";
import { deleteFileFromBuckets } from "@/lib/utils/file/delete-file-from-buckets";

export const useDeleteArtistCoverImage = () => {
	const deleteArtistCoverImageMutation = useMutation({
		mutationFn: async(cover_image_path: Pick<ArtistAttributesType, "cover_image_path">["cover_image_path"]) => {
			if (!cover_image_path) return;
			
			return deleteFileFromBuckets({
				bucket: "images", path: cover_image_path,
			})
		},
		onError: e => { throw new Error(e.message)}
	})
	
	return { deleteArtistCoverImageMutation }
}