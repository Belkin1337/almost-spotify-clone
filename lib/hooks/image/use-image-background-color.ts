import { useCallback } from "react";
import { getColorAverage } from "@/lib/tools/image-color-sampling";
import { useQueryClient } from "@tanstack/react-query";
import { ColoredBackgroundType } from "@/ui/colored-background";
import { backgroundColorSampleQueryKey } from "@/lib/querykeys/file";

export const useImageBackgroundColor = () => {
	const queryClient = useQueryClient();

	const handleBackgroundColor = useCallback(async ({
		color,
		imageUrl
	}: ColoredBackgroundType) => {
		if (imageUrl) {
			const output = await getColorAverage(imageUrl);

			queryClient.setQueryData(backgroundColorSampleQueryKey, output);
		} else if (color && !imageUrl) {
			queryClient.setQueryData(backgroundColorSampleQueryKey, color)
		}
	}, [queryClient]);

	return { handleBackgroundColor }
}