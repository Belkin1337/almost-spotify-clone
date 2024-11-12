import { Form } from "@/ui/form"
import { useRef } from "react"
import { ArtistFormFields } from "@/components/forms/artist/components/artist-form-fields";
import { useEditArtist, zodEditSchema } from "@/components/forms/artist/hooks/use-edit-artist";
import { ArtistItemProps } from "@/components/artist/types/artist-types";

export const EditArtistForm = ({
	artist
}: ArtistItemProps) => {
	const imageRef = useRef<HTMLInputElement>(null);
	const imageCoverRef = useRef<HTMLInputElement>(null);
	const { editArtistMutation, form } = useEditArtist({ artist });
	
	const onSubmit = (values: zodEditSchema) => {
		if (!values || !imageRef.current || !imageCoverRef.current) return;
		
		const imageFile = imageRef.current.files ? imageRef.current.files[0] : null;
		const coverImageFile = imageCoverRef.current.files ? imageCoverRef.current.files[0] : null;
		
		if (!imageFile) return;
		
		return editArtistMutation.mutate({
			id: artist.id,
			name: values.name,
			avatar: imageFile,
			description: values.description,
			cover_image: coverImageFile ?? undefined
		})
	}
	
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-y-6 p-6 min-w-[1200px]"
			>
				<ArtistFormFields
					form={form}
					type="edit"
					artist={artist!}
					isLoading={editArtistMutation.isPending}
					refs={{ imageRef, imageCoverRef }}
				/>
			</form>
		</Form>
	)
}