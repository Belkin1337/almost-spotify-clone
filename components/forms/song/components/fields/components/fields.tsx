import { useScopedI18n } from "@/locales/client";
import { Button } from "@/ui/button";
import { FormFieldItem } from "@/ui/form-field";
import { Typography } from "@/ui/typography";
import { FormField, FormMessage } from "@/ui/form";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/ui/select";
import { useUserArtistListQuery } from "@/lib/query/user/user-artists-list-query";
import { useUserQuery } from "@/lib/query/user/user-query";
import { GenreCard } from "@/components/genre/components/genre-card";
import { ArtistCardSelect } from "@/components/artist/select/components/artist-card-select";
import { IFormFields } from "@/components/forms/song/components/fields/types/fields-types";
import { useGenresQuery } from "@/lib/query/genre/genres-query";
import { Input } from "@/ui/input";
import { handleChangeImage } from "@/lib/utils/form/handle-change-image";
import { useSongPreviewState } from "@/components/forms/song/hooks/use-song-preview-state";
import { useAddFieldsValue } from "@/components/forms/song/hooks/use-add-fields-value";
import { zodSongSchema } from "@/components/forms/song/components/create-song";
import { TipWidget } from "@/components/static/tips/components/tip-widget";
import { Checkbox } from "@/ui/checkbox";
import { Tip } from "@/components/tooltip/components/tip";
import { ArtistRoleSelect } from "@/components/artist/select/components/artist-role-select";
import { SONG_ADDITIONAL_ACTIONS } from "@/lib/constants/shared/song-additional-actions";
import { WIDGET_LIST_FIELDS } from "@/lib/constants/shared/widgets";
import { FormWrapper } from "@/ui/form-wrapper";

const AddItemButton = () => {
	return (
		<SelectTrigger className="flex items-center h-full">
			<Button className="bg-neutral-800">
				Добавить
			</Button>
		</SelectTrigger>
	)
}

export const SongFormFields = ({
	form,
	isLoading,
	refs,
	type,
	song
}: IFormFields) => {
	const [creditsOpen, setCreditsOpen] = useState<boolean>(false);
	const { data: user } = useUserQuery();
	const { data: userArtists } = useUserArtistListQuery(user?.id!);
	const { data: genres } = useGenresQuery();
	const { changeInputValues, handleRemoveArtist } = useAddFieldsValue();

	const uploadModalLocale = useScopedI18n('main-service.main-part.config')
	const buttonText = type === 'create' ? uploadModalLocale('modal.submit') : type === 'edit' && 'Обновить'

	const {
		songPreviewState,
		setSongPreviewAttributes
	} = useSongPreviewState({
		song: song,
		type: type
	});

	const handleInputValues = (
		key: keyof zodSongSchema,
		value: string
	) => {
		return changeInputValues({
			form: form,
			key: key,
			genres: genres,
			userArtists: userArtists,
			value: value,
			songPreviewState: songPreviewState,
			setSongPreviewAttributes: setSongPreviewAttributes
		})
	}

	useEffect(() => {
		console.log(songPreviewState, form.getValues())
	}, [songPreviewState, form])

	if (!song && type === 'edit') return;

	return (
		<div className="flex flex-col gap-y-4 min-w-[400px] grow">
			<FormWrapper>
				<Typography className="text-2xl" font="semibold">
					Основное
				</Typography>
				<FormField
					control={form.control}
					name="title"
					render={({ field: { onChange, ...field } }) => (
						<FormFieldItem label={uploadModalLocale('song-attributes.song-name')} {...field}>
							<Input
								placeholder={uploadModalLocale('placeholder.fields.example') + ' Awakening'}
								name="song_title"
								autoComplete='false'
								maxLength={84}
								autoCorrect='false'
								onChange={(e: ChangeEvent<HTMLInputElement>) => {
									handleInputValues('title', e.target.value);
									onChange && onChange(e.target.value)
								}}
							/>
						</FormFieldItem>
					)}
				/>
				<FormField
					control={form.control}
					name="artists"
					render={() => (
						<div className="flex flex-col gap-y-1">
							<Typography>
								Артист
							</Typography>
							<Select onValueChange={(value: string) => handleInputValues('artists', value)}>
								<div className="flex flex-wrap items-center gap-4">
									{songPreviewState.artists!.length > 0 && (
										<div className="flex flex-wrap gap-2">
											{songPreviewState.artists!.map((artist) => (
												<ArtistCardSelect
													key={artist.id}
													artist={artist}
													isChecked={songPreviewState.artists?.some(item => item.id === artist.id)}
													onClick={(e: MouseEvent<HTMLDivElement>) => {
														e.stopPropagation();
														handleRemoveArtist(
															artist.id,
															songPreviewState.artists!,
															form,
															setSongPreviewAttributes
														)
													}}
												/>
											))}
										</div>
									)}
									<AddItemButton/>
									<TipWidget>
										{WIDGET_LIST_FIELDS[0].text}
									</TipWidget>
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
													isChecked={songPreviewState.artists?.some(item => item.id === artist.id)}
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
				{songPreviewState?.artists?.length! >= 1 && (
					<div className="flex flex-col gap-y-2">
						<div
							onClick={() => setCreditsOpen(!creditsOpen)}
							className="flex items-center justify-center w-max px-3 py-2 gap-2 rounded-xl bg-neutral-800"
						>
							<Typography>
								Указать авторство
							</Typography>
							<Tip action="Вы можете указать авторство/роль в создании трека каждому артисту."/>
						</div>
						{creditsOpen && (
							<div className="flex flex-col gap-y-2">
								<Typography>
									Выбери артиста и его роль в создании трека
								</Typography>
								{songPreviewState?.artists?.length! >= 1 ? (
									<div className="flex flex-col gap-2">
										<ArtistRoleSelect/>
									</div>
								) : (
									<Typography>
										Произошла ошибка. Попробуйте позже!
									</Typography>
								)}
							</div>
						)}
					</div>
				)}
				<FormField
					control={form.control}
					name="genre"
					render={() => (
						<div className="flex flex-col gap-y-1">
							<Typography>
								Жанр
							</Typography>
							<Select onValueChange={(value: string) => handleInputValues('genre', value)}>
								<div className="flex flex-wrap items-center gap-4">
									{songPreviewState.genre && (
										<div className="flex flex-wrap gap-2">
											<GenreCard
												key={songPreviewState.genre.id}
												name={songPreviewState.genre.name}
												isChecked={true}
											/>
										</div>
									)}
									<AddItemButton/>
								</div>
								<SelectContent className="flex flex-col p-2 w-full max-w-[700px]">
									<Typography className="mb-2">
										Доступные жанры:
									</Typography>
									<div className="flex flex-wrap w-auto gap-2">
										{genres?.map(genre => (
											<SelectItem
												className="flex flex-row items-center w-min p-0"
												value={genre.id}
												key={genre.id}
											>
												<GenreCard name={genre.name} isChecked={songPreviewState?.genre?.id === genre.id}/>
											</SelectItem>
										))}
									</div>
								</SelectContent>
							</Select>
							<FormMessage/>
						</div>
					)}
				/>
				{type === 'create' && (
					<FormField
						control={form.control}
						name="song"
						render={({ field }) => (
							<FormFieldItem label={`${uploadModalLocale('song-attributes.song-file')} (wav)`} {...field}>
								<Input
									name="song_file"
									accept=".wav"
									type="file"
									ref={refs?.songRef}
								/>
							</FormFieldItem>
						)}
					/>
				)}
				{type === 'create' && (
					<FormField
						control={form.control}
						name="image"
						render={({ field: { onChange, ...field } }) => (
							<FormFieldItem
								label={`${uploadModalLocale('song-attributes.song-image')} (webp, jpeg, jpg, png)`} {...field}>
								<Input
									name="song_image"
									accept="image/png,image/jpeg,image/jpg,image/webp"
									type="file"
									ref={refs?.imageRef}
									onChange={(e: ChangeEvent<HTMLInputElement>) => {
										handleChangeImage(e, setSongPreviewAttributes, 'image')
										onChange && onChange(e);
									}}
								/>
							</FormFieldItem>
						)}
					/>
				)}
			</FormWrapper>
			<FormWrapper>
				<Typography className="text-2xl" font="semibold">
					Дополнительно
				</Typography>
				<div className="flex flex-wrap items-center gap-2 w-full">
					{SONG_ADDITIONAL_ACTIONS.map((item,
							idx) => (
							<div key={idx} className="flex items-center justify-center px-3 py-2 gap-2 rounded-xl bg-neutral-800">
								{item.icon}
								<Typography>
									{item.title}
								</Typography>
							</div>
						)
					)}
				</div>
			</FormWrapper>
			{type === 'create' && (
					<FormWrapper>
						<Typography className="text-2xl" font="semibold">
							Важное
						</Typography>
						<div className="flex flex-row gap-2 w-full items-center">
							<FormField
								control={form.control}
								name="single"
								render={({ field }) => (
									<FormFieldItem {...field} label="">
										<div className="flex items-center justify-center w-max px-3 py-2 gap-2 rounded-xl bg-neutral-800">
											<Checkbox
												checked={field.value}
												onCheckedChange={(checked: boolean) => handleInputValues('single', checked.toString())}
											/>
											<Typography>
												Сделать трек синглом?
											</Typography>
											<Tip action="Это значит, что этот трек нельзя будет добавлять в альбомы или EP."/>
										</div>
									</FormFieldItem>
								)}
							/>
							{/*<FormField*/}
							{/*	control={form.control}*/}
							{/*	name="single"*/}
							{/*	render={({ field: { onChange, ...field } }) => (*/}
							{/*		<FormFieldItem {...field} label="">*/}
							{/*			<div className="flex items-center justify-center w-max px-3 py-2 gap-2 rounded-xl bg-neutral-800">*/}
							{/*				<Checkbox*/}
							{/*					onCheckedChange={(checked: boolean) => {*/}
							{/*						handleInputValues('single', checked.toString())*/}
							{/*					}}*/}
							{/*				/>*/}
							{/*				<Typography>*/}
							{/*					Сделать трек приватным*/}
							{/*				</Typography>*/}
							{/*				<Tip*/}
							{/*					action="Это значит, что этот трек будет отображаться только для вас и для тех, у кого есть приватная ссылка."/>*/}
							{/*			</div>*/}
							{/*		</FormFieldItem>*/}
							{/*	)}*/}
							{/*/>*/}
						</div>
					</FormWrapper>
				)
			}
			<Button
				type="submit"
				variant="form"
				align="centered"
				rounded="medium"
				background_color="default"
				disabled={isLoading}
			>
				<Typography>
					{buttonText}
				</Typography>
			</Button>
		</div>
	)
}