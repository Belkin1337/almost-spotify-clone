import { useMutation } from "@tanstack/react-query";
import { ArtistAttributesType } from "@/components/forms/artist/hooks/use-create-artist";
import { deleteFileFromBuckets } from "@/lib/utils/file/delete-file-from-buckets";

export const useDeleteArtistImage = () => {
	const deleteArtistImageMutation = useMutation({
		mutationFn: async(avatar_path: Pick<ArtistAttributesType, "avatar_path">["avatar_path"]) => {
			if (!avatar_path) return;
			
			return deleteFileFromBuckets({
				path: avatar_path,
				bucket: "images"
			})
		},
		onError: e => { throw new Error(e.message )}
	})
	
	return { deleteArtistImageMutation }
}