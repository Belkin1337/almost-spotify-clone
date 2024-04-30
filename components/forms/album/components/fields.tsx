import { createAlbumSchema } from "@/components/forms/album/schemas/schema-album";
import { SongEntity } from "@/types/song";
import { Button } from "@/ui/button";
import { FormField, FormMessage } from "@/ui/form";
import { FormFieldItem } from "@/ui/form-field";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/ui/select";
import { Typography } from "@/ui/typography";
import { ChangeEvent, MouseEvent, MutableRefObject, useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { ArtistEntity } from "@/types/artist";
import { AlbumFormPreview } from "./preview";
import { Input } from "@/ui/input";
import { ArtistCardSelect } from "@/components/artist/components/select/components/artist-card-select";
import { SongCardSelect } from "@/components/song/components/select/song-card-select";
import { useUserArtistListQuery } from "@/lib/query/user/user-artists-list-query";
import { useUserSongsQuery } from "@/lib/query/user/user-songs-query";
import { useUserQuery } from "@/lib/query/user/user-query";
import { handleChangeImage } from "@/lib/utils/form/handle-change-image";
import { usePreviewAlbum } from "@/components/forms/album/hooks/use-preview-album";
import { removeArtist } from "@/lib/utils/form/remove-artist";

type zodAlbumSchema = z.infer<typeof createAlbumSchema>

interface IAlbumFormFields {
	form: UseFormReturn<zodAlbumSchema>,
	isLoading: boolean,
	refs: { imageRef: MutableRefObject<HTMLInputElement | null> }
}

export const AlbumFormFields = ({
	form,
	isLoading,
	refs
}: IAlbumFormFields) => {
	const { data: user } = useUserQuery();
	const { data: userArtists } = useUserArtistListQuery(user?.id!);
	const { data: songs } = useUserSongsQuery(user?.id!)

	const { albumPreviewState, setAlbumPreviewAttributes } = usePreviewAlbum({
		title: '',
		songs: [],
		image: '',
		artists: []
	});

	const handleChangeInputValues = useCallback((
		key: keyof zodAlbumSchema,
		value: string,
	) => {
		const artistItem = userArtists?.find(item => item.id === value);
		const songItem = songs?.find(item => item.id === value);

		let updatedArtists: ArtistEntity[];
		let updatedSongs: SongEntity[];

		if (key === 'artists') {
			if (!artistItem) return;

			if (albumPreviewState.artists?.some(item => item.id === value)) {
				return;
			} else {
				if (albumPreviewState.artists?.length! <= 2) {
					updatedArtists = [...albumPreviewState.artists!, artistItem];

					setAlbumPreviewAttributes.mutate({
						artists: updatedArtists
					})

					form.setValue("artists", updatedArtists.map(item => item.id));
				}
			}
		} else if (key === 'songs') {
			if (!songItem) return;

			if (albumPreviewState.songs?.some(item => item.id === value)) {
				updatedSongs = albumPreviewState.songs.filter(item => item.id !== value);
			} else {
				updatedSongs = [...albumPreviewState.songs!, songItem];

				form.setValue("songs", updatedSongs.map(item => item.id));

				setAlbumPreviewAttributes.mutate({
					songs: updatedSongs
				})
			}
		} else {
			setAlbumPreviewAttributes.mutate({
				[key]: value
			});
		}
	}, [form, albumPreviewState]);

	if (!songs) return null;

	return (
		<div className="flex lg:flex-row flex-col gap-x-4 gap-y-6 items-center justify-stretch">
			<div className="flex flex-col gap-y-8 w-full">
				<FormField
					control={form.control}
					name="title"
					render={({ field: { onChange, ...field } }) => (
						<FormFieldItem label="Название альбома"{...field}>
							<Input
								placeholder='Название'
								name="album_title"
								autoComplete='false'
								autoCorrect='false'
								onChange={(e: ChangeEvent<HTMLInputElement>) => {
									handleChangeInputValues('title', e.target.value)
									onChange && onChange(e);
								}}
							/>
						</FormFieldItem>
					)}
				/>
				<FormField
					control={form.control}
					name="artists"
					render={({ field: { onChange, ...field } }) => (
						<div className="flex flex-col gap-y-1">
							<Typography>
								Артисты
							</Typography>
							<Select
								defaultValue={field.value[0]}
								onValueChange={(value: string) => handleChangeInputValues('artists', value)}
							>
								<div className="flex flex-wrap items-center gap-4">
									{albumPreviewState.artists?.length! > 0 && (
										<div className="flex flex-wrap gap-2">
											{albumPreviewState.artists?.map((artist) => (
												<ArtistCardSelect
													key={artist.id}
													artist={artist}
													isChecked={albumPreviewState.artists?.some(item => item.id === artist.id)}
													onClick={(e: MouseEvent<HTMLDivElement>) => {
														e.stopPropagation();
														removeArtist(
															artist.id,
															albumPreviewState.artists!,
															form,
															setAlbumPreviewAttributes
														)
													}}
												/>
											))}
										</div>
									)}
									<SelectTrigger className="flex items-center h-full">
										<Button className="bg-neutral-800">
											Добавить
										</Button>
									</SelectTrigger>
								</div>
								<SelectContent className="flex flex-col p-2 w-full max-w-[700px]">
									<Typography className="mb-2">
										Доступные артисты:
									</Typography>
									<div className="flex flex-wrap w-auto gap-2">
										{userArtists?.map((artist) => (
											<SelectItem value={artist.id} key={artist.id} className="flex flex-row items-center w-min p-0">
												<ArtistCardSelect
													artist={artist}
													isChecked={albumPreviewState.artists?.some(item => item.id === artist.id)}
												/>
											</SelectItem>
										))}
									</div>
								</SelectContent>
							</Select>
							<FormMessage/>
						</div>
					)}
				/>
				<FormField
					control={form.control}
					name="songs"
					render={({ field: { onChange, ...field } }) => (
						<div className="flex flex-col gap-y-1">
							<Typography>
								Треки
							</Typography>
							<Select
								defaultValue={field.value[0]}
								onValueChange={(value: string) => handleChangeInputValues('songs', value)}
							>
								<div className="flex flex-wrap items-start gap-4">
									{albumPreviewState.songs?.length! > 0 && (
										<div className="flex flex-col gap-2 max-w-[218px]">
											{albumPreviewState.songs!.map(song => (
												<SongCardSelect
													key={song.id}
													song={song}
													isChecked={albumPreviewState.songs!.some(item => item.id === song.id)}
												/>
											))}
										</div>
									)}
									<SelectTrigger className="flex items-center h-full">
										<Button className="bg-neutral-800">
											Добавить
										</Button>
									</SelectTrigger>
								</div>
								<SelectContent className="flex flex-col p-2 w-full max-w-[700px]">
									<Typography className="mb-2">
										Доступные треки:
									</Typography>
									<div className="flex flex-wrap w-auto gap-2">
										{songs?.map((song) => (
											<SelectItem
												key={song.id}
												className="flex flex-row items-center w-min p-0"
												value={song.id}
											>
												<SongCardSelect
													song={song}
													isChecked={albumPreviewState.songs!.some(item => item.id === song.id)}
												/>
											</SelectItem>
										))}
									</div>
								</SelectContent>
							</Select>
							<FormMessage/>
						</div>
					)}
				/>
				<FormField
					control={form.control}
					name="image"
					render={({ field: { ref, onChange, ...field } }) => (
						<FormFieldItem label='Обложка альбома'{...field}>
							<Input
								name="album_image"
								accept="image/*"
								type="file"
								ref={refs.imageRef}
								onChange={(e: ChangeEvent<HTMLInputElement>) => {
									handleChangeImage(e, setAlbumPreviewAttributes, e.target.value);
									onChange && onChange(e);
								}}
							/>
						</FormFieldItem>
					)}
				/>
				<Button
					type="submit"
					variant="form"
					align="centered"
					rounded="medium"
					background_color="default"
					disabled={isLoading}
				>
					<Typography>
						Создать альбом
					</Typography>
				</Button>
			</div>
			<AlbumFormPreview preview={albumPreviewState}/>
		</div>
	)
}