import { ArtistEntity } from "@/types/artist";
import { UseFormReturn } from "react-hook-form";
import { UseMutationResult } from "@tanstack/react-query";
import { PreviewSongType } from "@/types/form";

export const removeArtist = (
	id: string,
	artists: ArtistEntity[],
	form: UseFormReturn<any>,
	setActionPreview: UseMutationResult<PreviewSongType | undefined, Error, any, unknown>,
) => {
	const removedArtists = artists.filter(artist => artist.id !== id)

	if (removedArtists.length >= 1) {
		setActionPreview.mutate({
			artists: removedArtists
		})

		form.setValue("artists", removedArtists.map(item => item.id));
	} else if (removedArtists.length <= 1) {
		setActionPreview.mutate({
			artists: []
		})

		form.setValue("artists", [])
	}
}