import { useMutation } from "@tanstack/react-query";
import { SongAttributes } from "@/types/song";
import { uploadFileToBuckets } from "@/lib/utils/file/upload-file-to-buckets";
import { MESSAGE_ERROR_FILE_UPLOAD } from "@/lib/constants/messages/messages";
import { useToast } from "@/lib/hooks/ui/use-toast";

export function useUploadSongImage() {
	const { toast } = useToast();

	const createSongImageMutation = useMutation({
		mutationFn: async (
			{ image, title }: SongAttributes
		) => {
			if (image && title) {
				const { fileData } = await uploadFileToBuckets({
					title: title,
					bucket: "images",
					file: image,
					type: "song"
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
	});

	return { createSongImageMutation }
}