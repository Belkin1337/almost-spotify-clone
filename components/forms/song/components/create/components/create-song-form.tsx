"use client"

import { Form } from "@/ui/form";
import { useCreateSong } from "@/components/forms/song/components/create/hooks/use-create-song";
import { useCallback, useRef } from "react";
import { useUserQuery } from "@/lib/query/user/user-query";
import { SongFormPreview } from "@/components/forms/song/components/song-form-preview";
import { zodSongSchema } from "@/components/forms/song/components/create/types/create-form-types";
import { CreateSongFormFields } from "@/components/forms/song/components/create/components/create-song-form-fields";

export const CreateSongForm = () => {
	const [imageRef, songRef] = [
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null)
	];

	const { data: user } = useUserQuery();
	const { createSongMutation, form } = useCreateSong();

	const onSubmit = useCallback(async (
		values: zodSongSchema
	) => {
		try {
			if (!values || !songRef.current || !imageRef.current) return;

			const songFile = songRef.current.files ? songRef.current.files[0] : null;
			const imageFile = imageRef.current.files ? imageRef.current.files[0] : null;

			if (songFile && imageFile && values) await createSongMutation.mutateAsync({
				title: values.title,
				artists: values.artists,
				genre: values.genre,
				song: songFile,
				image: imageFile,
				single: !!values.single
			});
		} catch (error) {
			throw error;
		}
	}, [createSongMutation, songRef, imageRef])

	if (!user) return;

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-6">
				<div className="flex lg:flex-row flex-wrap flex-col items-start justify-between">
					<CreateSongFormFields
						form={form}
						isLoading={createSongMutation.isPending}
						refs={{ songRef: songRef, imageRef: imageRef }}
					/>
					<SongFormPreview/>
				</div>
			</form>
		</Form>
	)
}