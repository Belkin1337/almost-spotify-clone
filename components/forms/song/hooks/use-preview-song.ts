import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PreviewSongType } from "@/types/form";
import { songPreviewQueryKey } from "@/lib/querykeys/song";

const initialSongPreviewData = (
	values: PreviewSongType
) => {
	return {
		title: values.title,
		genre: values.genre,
		image: values.image,
		artists: values.artists,
		credits: values.credits
	}
}

export const usePreviewSong = ({
	...values
}: PreviewSongType) => {
	const queryClient = useQueryClient();

	const { data: songPreviewState } = useQuery({
		queryKey: songPreviewQueryKey,
		refetchOnWindowFocus: false,
		initialData: initialSongPreviewData(values),
		staleTime: Infinity,
		gcTime: Infinity,
		retry: 1,
		refetchOnReconnect: false
	})

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

	return { setSongPreviewAttributes, songPreviewState }
}