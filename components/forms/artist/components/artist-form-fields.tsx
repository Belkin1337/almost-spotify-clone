import { useScopedI18n } from "@/locales/client";
import { Button } from "@/ui/button";
import { FormField } from "@/ui/form";
import { FormFieldItem } from "@/ui/form-field";
import { Typography } from "@/ui/typography";
import { ChangeEvent, MutableRefObject, useCallback, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { ArtistFormPreview } from "./artist-form-preview";
import { PreviewArtistType } from "@/types/form";
import { ArtistEntity } from "@/types/artist";
import { useLoadImage } from "@/lib/hooks/image/use-load-image";
import { Input } from "@/ui/input";
import { zodEditSchema } from "@/components/forms/artist/hooks/use-edit-artist";

type ArtistFormFieldType = "create" | "edit"

interface IArtistFormFields {
	form: UseFormReturn<zodEditSchema>,
	isLoading: boolean,
	refs?: {
		imageRef?: MutableRefObject<HTMLInputElement | null>,
		imageCoverRef?: MutableRefObject<HTMLInputElement | null>
	},
	type: ArtistFormFieldType,
	artist?: ArtistEntity
}

export const ArtistFormFields = ({
	form, isLoading, refs, type, artist
}: IArtistFormFields) => {
	const { data: avatar } = useLoadImage(artist?.avatar_path!);
	const { data: cover_image } = useLoadImage(artist?.cover_image_path!)

	const [preview, setPreview] = useState<PreviewArtistType>({
		name: artist ? artist.name : '',
		description: artist ? artist.description : '',
		avatar: artist ? avatar?.url : "",
		cover_image: artist ? cover_image?.url : ""
	});

	const uploadModalLocale = useScopedI18n('main-service.main-part.config')

	const handleImageChange = useCallback((
		fieldName: keyof zodEditSchema,
		event: ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files ? event.target.files[0] : null;

		if (file) {
			const reader = new FileReader();

			reader.readAsDataURL(file);
			reader.onload = () => {
				setPreview((prev) => ({
					...prev,
					[fieldName]: reader.result as string
				}));
			};
		}
	}, []);

	const handleInputChange = useCallback(
		(fieldName: keyof zodEditSchema) => (e: ChangeEvent<HTMLInputElement>) => {
			setPreview(prevState => ({
				...prevState,
				[fieldName]: e.target.value
			}));
		}, []);

	useEffect(() => {
		console.log(preview, form.getValues());
	}, [preview, form])

	if (!artist && type === "edit") return null;

	return (
		<div className="flex lg:flex-row flex-col gap-x-4 gap-y-6 items-center justify-stretch">
			<div className="flex flex-col gap-y-8 w-2/3">
				<FormField
					control={form.control}
					name="name"
					render={({
						field: {
							onChange,
							...field
						}
					}) => (
						<FormFieldItem label='Имя артиста' {...field}>
							<Input
								placeholder='Имя'
								name="artist_name"
								autoComplete='false'
								autoCorrect='false'
								onChange={(e: ChangeEvent<HTMLInputElement>) => {
									handleInputChange('name')(e)
									onChange && onChange(e);
								}}
							/>
						</FormFieldItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({
						field: { onChange, ...field }
					}) => (
						<FormFieldItem label='Описание артиста' {...field}>
							<Input
								placeholder='Описание'
								name="artist_description"
								autoComplete='false'
								autoCorrect='false'
								onChange={(e: ChangeEvent<HTMLInputElement>) => {
									handleInputChange('description')(e)
									onChange && onChange(e);
								}}
							/>
						</FormFieldItem>
					)}
				/>
				<FormField
					control={form.control}
					name="avatar"
					render={({
						field: { ref, onChange, ...field }
					}) => (
						<FormFieldItem label="Аватарка артиста"{...field}>
							<Input
								name="artist_avatar"
								accept="image/*"
								type="file"
								ref={refs?.imageRef}
								onChange={(e: ChangeEvent<HTMLInputElement>) => {
									handleImageChange('avatar', e);
									onChange && onChange(e);
								}}
							/>
						</FormFieldItem>
					)}
				/>
				<FormField
					control={form.control}
					name="cover_image"
					render={({
						field: { ref, onChange, ...field }
					}) => (
						<FormFieldItem label="Фон артиста"{...field}>
							<Input
								name="artist_cover_image"
								accept="image/*"
								type="file"
								ref={refs?.imageCoverRef}
								onChange={(e: ChangeEvent<HTMLInputElement>) => {
									handleImageChange('cover_image', e);
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
						{uploadModalLocale('modal.submit')}
					</Typography>
				</Button>
			</div>
			<ArtistFormPreview preview={preview}/>
		</div>
	)
}