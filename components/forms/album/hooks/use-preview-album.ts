import { QueryKey, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PreviewAlbumType } from "@/types/preview";

export const albumPreviewQueryKey: QueryKey = ["form-album-preview"]

const initialAlbumPreviewData = (
	values: PreviewAlbumType
) => {
	return {
		title: values.title,
		image: values.image,
		songs: values.songs,
		artists: values.artists,
	}
}

export const usePreviewAlbum = ({
	...values
}: PreviewAlbumType) => {
	const queryClient = useQueryClient();

	const { data: albumPreviewState } = useQuery({
		queryKey: albumPreviewQueryKey,
		refetchOnWindowFocus: false,
		initialData: initialAlbumPreviewData(values),
		staleTime: Infinity,
		gcTime: Infinity,
		retry: 1,
		refetchOnReconnect: false
	})

	const setAlbumPreviewAttributes = useMutation({
		mutationFn: async (
			newAttributes: PreviewAlbumType
		) => {
			return queryClient.setQueryData<PreviewAlbumType>(
				albumPreviewQueryKey,
				(prev) => {
					return { ...prev, ...newAttributes }
				}
			)
		},
		onSuccess: () => {
			return queryClient.invalidateQueries({
				queryKey: albumPreviewQueryKey
			});
		}
	})

	return {
		setAlbumPreviewAttributes,
		albumPreviewState
	}
}