import { useMutation } from "@tanstack/react-query";
import { ArtistAttributesType } from "@/components/forms/artist/hooks/use-create-artist";
import { uploadFileToBuckets } from "@/lib/utils/file/upload-file-to-buckets";
import { MESSAGE_ERROR_FILE_UPLOAD } from "@/lib/constants/messages/messages";
import { useToast } from "@/lib/hooks/ui/use-toast";

export const useCreateArtistImage = () => {
	const { toast } = useToast();

	const uploadArtistImageMutation = useMutation({
		mutationFn: async (
			values: ArtistAttributesType
		) => {
			if (values.avatar && values.name) {
				const { fileData } = await uploadFileToBuckets({
					title: values.name,
					file: values.avatar,
					type: "artists",
					bucket: "images",
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

	return { uploadArtistImageMutation }
}