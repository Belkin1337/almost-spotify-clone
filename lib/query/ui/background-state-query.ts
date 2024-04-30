import { useQuery } from "@tanstack/react-query";
import { backgroundColorSampleQueryKey } from "@/lib/querykeys/file";
import { DEFAULT_BACKGROUND_COLOR } from "@/lib/constants/ui/background-colors";

export interface IBackgroundStateQuery {
	imageUrl?: string, // image url for color sampling or static color
	active_section?: string;
	type?: string; // for optional current route type
}

const initialData: IBackgroundStateQuery = {
	imageUrl: DEFAULT_BACKGROUND_COLOR
}

export const useBackgroundStateQuery = () => {
	return useQuery<IBackgroundStateQuery, Error>({
		queryKey: backgroundColorSampleQueryKey,
		initialData: initialData,
		staleTime: Infinity,
		gcTime: Infinity,
		refetchOnWindowFocus: false
	})
}