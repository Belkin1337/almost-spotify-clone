import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { backgroundColorSampleQueryKey } from "@/lib/querykeys/file";
import { getColorAverage } from "@/lib/tools/image-color-sampling";
import { IBackgroundStateQuery } from "@/lib/query/ui/background-state-query";
import { DEFAULT_BACKGROUND_COLOR, LIKED_SONGS_COLOR } from "@/lib/constants/ui/background-colors";

export const useControlBackgroundState = () => {
	const qc = useQueryClient();

	const setBackgroundStateAttributes = useMutation({
		mutationFn: async (newValues: IBackgroundStateQuery) => {
			return qc.setQueryData<IBackgroundStateQuery>(
				backgroundColorSampleQueryKey,
				(prev) => {
					let imageUrl = newValues.imageUrl;
					
					if (newValues.type) {
						if (newValues.type === 'liked_songs') imageUrl = LIKED_SONGS_COLOR;
					}

					return { ...prev, imageUrl: imageUrl, }
				}
			)
		}
	})

	const getBackgroundSampleImage = useCallback(async ({
		imageUrl, type
	}: IBackgroundStateQuery) => {
		if (imageUrl) {
			const output = await getColorAverage(imageUrl);

			if (output) return setBackgroundStateAttributes.mutate({ imageUrl: output })
		} else if (!imageUrl && type) {
			return setBackgroundStateAttributes.mutate({ type })
		} else if (!imageUrl && !type) {
			return setBackgroundStateAttributes.mutate({ imageUrl: DEFAULT_BACKGROUND_COLOR })
		}
	}, [setBackgroundStateAttributes])

	return { getBackgroundSampleImage, setBackgroundStateAttributes }
}