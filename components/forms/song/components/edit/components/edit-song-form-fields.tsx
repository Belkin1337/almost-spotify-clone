import { ChangeEvent, MouseEvent, useState } from "react";
import { USER_QUERY_KEY } from "@/lib/query/user/user-query";
import { useUserArtistListQuery } from "@/lib/query/user/user-artists-list-query";
import { useGenresQuery } from "@/lib/query/genre/genres-query";
import { useAddFieldsValue } from "@/components/forms/song/hooks/use-add-fields-value";
import { useScopedI18n } from "@/locales/client";
import { useSongPreviewState } from "@/components/forms/song/hooks/use-song-preview-state";
import { zodSongSchema } from "@/components/forms/song/components/create/types/create-form-types";
import { FormWrapper } from "@/ui/form-wrapper";
import { Typography } from "@/ui/typography";
import { FormField, FormMessage } from "@/ui/form";
import { FormFieldItem } from "@/ui/form-field";
import { Input } from "@/ui/input";
import { Select, SelectContent, SelectItem } from "@/ui/select";
import { ArtistCardSelect } from "@/components/artist/components/select/components/artist-card-select";
import { TipWidget } from "@/components/static/tips/components/tip-widget";
import { WIDGET_LIST_FIELDS } from "@/lib/constants/shared/widgets";
import { Tip } from "@/components/tooltip/components/tip";
import { ArtistRoleSelect } from "@/components/artist/components/select/components/artist-role-select";
import { GenreCard } from "@/components/genre/components/card/genre-card";
import { SONG_ADDITIONAL_ACTIONS } from "@/lib/constants/shared/song-additional-actions";
import { Button } from "@/ui/button";
import {
	AddItemButton,
	IFormFields
} from "@/components/forms/song/components/create/components/create-song-form-fields";
import { SongItemsProps } from "@/components/forms/song/types/song-types";
import { UserEntity } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query"

type EditSongFormFieldsProps = SongItemsProps & IFormFields

export const EditSongFormFields = ({
	form, isLoading, song
}: EditSongFormFieldsProps) => {
	const [creditsOpen, setCreditsOpen] = useState<boolean>(false);
	const qc = useQueryClient()
	const user = qc.getQueryData<UserEntity>(USER_QUERY_KEY)
	const { data: userArtists } = useUserArtistListQuery(user?.id!);
	const { data: genres } = useGenresQuery();
	const { changeInputValues, handleRemoveArtist } = useAddFieldsValue();

	const { songPreviewState, setSongPreviewAttributes } = useSongPreviewState({
		song: song
	});

	const uploadModalLocale = useScopedI18n('main-service.main-part.config')

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

	if (!song) return;

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
			<Button
				type="submit"
				variant="form"
				align="centered"
				rounded="medium"
				background_color="default"
				disabled={isLoading}
			>
				<Typography>
					Обновить
				</Typography>
			</Button>
		</div>
	)
}