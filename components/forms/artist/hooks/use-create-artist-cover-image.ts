import { useMutation } from "@tanstack/react-query";
import { ArtistAttributesType } from "@/components/forms/artist/hooks/use-create-artist";
import { uploadFileToBuckets } from "@/lib/utils/file/upload-file-to-buckets";
import { MESSAGE_ERROR_FILE_UPLOAD } from "@/lib/constants/messages/messages";
import { useToast } from "@/lib/hooks/ui/use-toast";

export const useCreateArtistCoverImage = () => {
	const { toast } = useToast();

	const uploadArtistCoverImageMutation = useMutation({
		mutationFn: async (
			values: ArtistAttributesType
		) => {
			if (values.cover_image && values.name) {
				const { fileData } = await uploadFileToBuckets({
					title: values.name,
					type: "cover_image",
					file: values.cover_image,
					bucket: "images"
				})

				return fileData;
			}
		},
		onError: () => {
			toast({
				title: MESSAGE_ERROR_FILE_UPLOAD,
				variant: "red"
			})
		}
	})

	return { uploadArtistCoverImageMutation }
}