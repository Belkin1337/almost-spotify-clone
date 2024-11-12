"use client"

import { z } from "zod";
import { Form } from "@/ui/form";
import { useRef } from "react";
import { useCreateArtist } from "@/components/forms/artist/hooks/use-create-artist";
import { createArtistSchema } from "@/components/forms/artist/schemas/schema-artist";
import { ArtistFormFields } from "./artist-form-fields";

export type zodArtistSchema = z.infer<typeof createArtistSchema>

export const CreateArtistForm = () => {
	const [ imageRef, imageCoverRef ] = [
		useRef<HTMLInputElement | null>(null),
		useRef<HTMLInputElement | null>(null)
	];
	
	const { createArtistMutation, form } = useCreateArtist()
	
	const onSubmit = (values: zodArtistSchema) => {
		if (!values || !imageRef.current) return;
		
		const imageCoverFile = imageCoverRef?.current?.files ? imageCoverRef.current.files[0] : null;
		const avatar = imageRef.current.files ? imageRef.current.files[0] : null;
		
		if (!avatar || !values) return;
		
		const { name, description } = values;
		
		return createArtistMutation.mutate({
			name, avatar, description,
			cover_image: imageCoverFile ?? undefined
		})
	}
	
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-y-6"
			>
				<ArtistFormFields
					form={form}
					type="create"
					isLoading={createArtistMutation.isPending}
					refs={{ imageCoverRef, imageRef }}
				/>
			</form>
		</Form>
	)
}