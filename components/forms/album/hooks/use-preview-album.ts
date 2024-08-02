import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PreviewAlbumType } from "@/types/form";
import { albumPreviewQueryKey } from "@/components/forms/album/hooks/use-album-preview-query";

export const usePreviewAlbum = () => {
	const qc = useQueryClient();

	const setAlbumPreviewAttributes = useMutation({
		mutationFn: async (
			newAttributes: PreviewAlbumType
		) => {
			return qc.setQueryData<PreviewAlbumType>(
				albumPreviewQueryKey,
				(prev) => {
					return { ...prev, ...newAttributes }
				}
			)
		},
		onSuccess: async () => {
			await qc.invalidateQueries({ queryKey: albumPreviewQueryKey });
		}
	})

	return { setAlbumPreviewAttributes }
}