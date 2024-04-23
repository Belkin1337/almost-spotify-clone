"use client"

import { z } from "zod";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { Form } from "@/ui/form";
import { useCallback, useEffect, useRef } from "react";
import { useCreateArtist } from "@/components/forms/artist/hooks/use-create-artist";
import { createArtistSchema } from "@/components/forms/artist/schemas/schema-artist";
import { ArtistFormFields } from "./fields";
import { ArtistCreated } from "@/components/notifies/actions/artist-created";

export type zodArtistSchema = z.infer<typeof createArtistSchema>

export const CreateArtistForm = () => {
	const [imageRef, imageCoverRef] = [
		useRef<HTMLInputElement | null>(null),
		useRef<HTMLInputElement | null>(null)
	];

	const { toast } = useToast()
	const { createArtist, form } = useCreateArtist()

	const onSubmit = useCallback(async (
		values: zodArtistSchema
	) => {
		try {
			if (!values || !imageRef.current) return;

			const imageCoverFile = imageCoverRef?.current?.files ? imageCoverRef.current.files[0] : null;
			const imageFile = imageRef.current.files ? imageRef.current.files[0] : null;

			if (imageFile && values) await createArtist.mutateAsync({
				name: values.name,
				avatar: imageFile,
				cover_image: imageCoverFile || undefined,
				description: values.description,
			})
		} catch (error) {
			throw error;
		}
	}, [createArtist, imageCoverRef, imageRef])

	useEffect(() => {
		if (createArtist.isSuccess && createArtist.data) {
			const artist = createArtist.data[0];

			form.reset();

			toast({
				title: "Артист создан",
        variant: "right",
				description: (
          <ArtistCreated artist={artist}/>
        )
			})
		} else if (createArtist.isError) {
			toast({
				title: "Ошибка создания артиста. Повторите попытку позже!",
				variant: "red"
			})
		}
	}, [createArtist.isSuccess, form, toast, createArtist.isError, createArtist.data]);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-6">
				<ArtistFormFields
					form={form}
					type="create"
					isLoading={createArtist.isPending}
					refs={{ imageCoverRef: imageCoverRef, imageRef: imageRef }}
				/>
			</form>
		</Form>
	)
}