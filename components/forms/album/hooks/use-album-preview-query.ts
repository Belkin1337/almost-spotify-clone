import { PreviewAlbumType } from "@/types/form";
import { QueryKey, useQuery } from "@tanstack/react-query"

export const albumPreviewQueryKey: QueryKey = ["form_album_preview"]

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

export const usePreviewAlbumStateQuery = ({
	...values
}: PreviewAlbumType) => {
	const { data: albumPreviewState } = useQuery({
		queryKey: albumPreviewQueryKey,
		refetchOnWindowFocus: false,
		initialData: initialAlbumPreviewData(values),
		staleTime: Infinity,
		gcTime: Infinity,
		retry: 1,
		refetchOnReconnect: false
	})

	return { albumPreviewState }
}