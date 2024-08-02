import { useMutation } from "@tanstack/react-query";
import { ArtistAttributesType } from "@/components/forms/artist/hooks/use-create-artist";
import { deleteFileFromBuckets } from "@/lib/utils/file/delete-file-from-buckets";

export const useDeleteArtistImage = () => {
	const deleteArtistImageMutation = useMutation({
		mutationFn: async (
			{ avatar_path }: ArtistAttributesType
		) => {
			if (avatar_path) {
				const { fileData } = await deleteFileFromBuckets({
					path: avatar_path,
					bucket: "images"
				})

				return fileData;
			}
		}
	})

	return { deleteArtistImageMutation }
}