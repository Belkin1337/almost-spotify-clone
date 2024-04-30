import { UseFormReturn } from "react-hook-form";
import { UseMutationResult } from "@tanstack/react-query";
import { PreviewSongType } from "@/types/form";

export const removeGenre = (
	genre: string,
	form: UseFormReturn<any>,
	setActionPreview: UseMutationResult<PreviewSongType | undefined, Error, any, unknown>,
) => {
	if (genre) {
		setActionPreview.mutate({
			genre: genre
		})

		form.setValue("genre", genre);
	} else {
		setActionPreview.mutate({
			genre: []
		})

		form.setValue("genre", [])
	}
}