import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PreviewSongType } from "@/types/form";
import { songPreviewQueryKey } from "@/lib/querykeys/song";

export const usePreviewSong = () => {
	const queryClient = useQueryClient();

	const setSongPreviewAttributes = useMutation({
		mutationFn: async (
			newAttributes: PreviewSongType
		) => {
			return queryClient.setQueryData<PreviewSongType>(
				songPreviewQueryKey,
				(prev) => {
					return { ...prev, ...newAttributes }
				}
			)
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: songPreviewQueryKey
			});
		}
	})

	return { setSongPreviewAttributes }
}