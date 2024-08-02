import { Form } from "@/ui/form"
import { useCallback, useRef } from "react"
import { ArtistFormFields } from "@/components/forms/artist/components/artist-form-fields";
import { useEditArtist, zodEditSchema } from "@/components/forms/artist/hooks/use-edit-artist";
import { ArtistItemProps } from "@/components/artist/types/artist-types";

export const EditArtistForm = ({
	artist
}: ArtistItemProps) => {
	const imageRef = useRef<HTMLInputElement>(null);
	const coverImageRef = useRef<HTMLInputElement>(null);

	const { editArtistMutation, form } = useEditArtist({
		artist: artist
	});

	const onSubmit = useCallback(async (values: zodEditSchema) => {
		try {
			if (!values || !imageRef.current || !coverImageRef.current) return;

			const imageFile = imageRef.current.files ? imageRef.current.files[0] : null;
			const coverImageFile = coverImageRef.current.files ? coverImageRef.current.files[0] : null;

			if (imageFile && values) {
				await editArtistMutation.mutateAsync({
					id: artist.id,
					name: values.name,
					avatar: imageFile,
					description: values.description,
					cover_image: coverImageFile || undefined
				})
			}
		} catch (e) {
			throw e;
		}
	}, [artist.id, editArtistMutation])

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-6 p-6 min-w-[1200px]">
				<ArtistFormFields
					form={form}
					type="edit"
					artist={artist!}
					isLoading={editArtistMutation.isPending}
					refs={{ imageRef: imageRef, imageCoverRef: coverImageRef }}
				/>
			</form>
		</Form>
	)
}