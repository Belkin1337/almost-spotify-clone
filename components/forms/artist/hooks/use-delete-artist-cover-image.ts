import { useMutation } from "@tanstack/react-query";
import { ArtistAttributesType } from "@/components/forms/artist/hooks/use-create-artist";
import { deleteFileFromBuckets } from "@/lib/utils/file/delete-file-from-buckets";

export const useDeleteArtistCoverImage = () => {
	const deleteArtistCoverImageMutation = useMutation({
		mutationFn: async (
			{ cover_image_path }: ArtistAttributesType
		) => {
			if (cover_image_path) {
				const { fileData } = await deleteFileFromBuckets({
					bucket: "images",
					path: cover_image_path,
				})

				return fileData;
			}
		}
	})

	return { deleteArtistCoverImageMutation }
}