import { songPreviewQueryKey } from "@/lib/querykeys/song";
import { PreviewSongType } from "@/types/form";
import { useQuery } from "@tanstack/react-query"

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

export const usePreviewSongQuery = ({
	...values
}: PreviewSongType) => {
	const { data: songPreviewState } = useQuery({
		queryKey: songPreviewQueryKey,
		refetchOnWindowFocus: false,
		initialData: initialSongPreviewData(values),
		staleTime: Infinity,
		gcTime: Infinity,
		retry: 1,
		refetchOnReconnect: false
	})

	return { songPreviewState }
}