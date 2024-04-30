import { GenreType } from "@/lib/constants/shared/genres-list";
import { ArtistEntity } from "@/types/artist";
import { UseFormReturn } from "react-hook-form";
import { PreviewSongType } from "@/types/form";
import { UseMutationResult } from "@tanstack/react-query";
import { zodSongSchema } from "@/components/forms/song/components/create/types/create-form-types";

export const useAddFieldsValue = () => {
	const changeInputValues = ({
		form,
		key,
		genres,
		userArtists,
		value,
		songPreviewState,
		setSongPreviewAttributes
	}: {
		form: UseFormReturn<any, unknown, any>,
		key: keyof zodSongSchema,
		genres: GenreType[] | undefined,
		userArtists: ArtistEntity[] | null | undefined,
		value: string,
		songPreviewState?: PreviewSongType,
		setSongPreviewAttributes?: UseMutationResult<PreviewSongType | undefined, Error, PreviewSongType, unknown>
	}) => {
		const genreItem = genres?.find(item => item.id === value);

		let updatedGenre: GenreType | null;
		let updatedArtists: ArtistEntity[];

		if (key === 'genre') {
			if (!genreItem) return;

			if (songPreviewState?.genre?.id === value) {
				return;
			} else {
				updatedGenre = genreItem;

				form.setValue("genre", updatedGenre?.id.toString());

				setSongPreviewAttributes?.mutate({
					genre: updatedGenre
				});
			}
		} else if (key === 'artists') {
			if (!value) return;

			const artistItem = userArtists?.find(item => item.id === value);

			if (songPreviewState?.artists?.some(item => item.id === artistItem?.id)) {
				return;
			} else {
				if (songPreviewState?.artists?.length! < 4 && artistItem) {
					updatedArtists = [...songPreviewState?.artists!, artistItem];

					setSongPreviewAttributes?.mutate({
						artists: updatedArtists
					})

					form.setValue("artists", updatedArtists.map(item => item.id));
				}
			}
		} else if (key === 'single') {
			if (value === 'true') {
				form.setValue("single", true);
			} else {
				form.setValue("single", false)
			}
		} else {
			setSongPreviewAttributes?.mutate({
				[key]: value
			});
		}
	}

	const handleRemoveArtist = (
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
				artists: [],
				credits: []
			})

			form.setValue("artists", [])
		}
	}

	return { changeInputValues, handleRemoveArtist }
}