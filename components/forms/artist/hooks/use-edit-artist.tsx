import { useCreateArtistImage } from "@/components/forms/artist/hooks/use-create-artist-image";
import { USER_QUERY_KEY } from "@/lib/query/user/user-query";
import { ArtistAttributesType } from "@/components/forms/artist/hooks/use-create-artist";
import { useMutation } from "@tanstack/react-query";
import { ArtistEntity } from "@/types/artist";
import { ArtistEditedNotify } from "@/components/notifies/actions/artist/artist-edited-notify";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createArtistSchema } from "@/components/forms/artist/schemas/schema-artist";
import { z } from "zod";
import { UserEntity } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query"
import { updateArtist } from "@/components/forms/artist/queries/edit-artist";

export type zodEditSchema = z.infer<typeof createArtistSchema>

export const useEditArtist = ({
	artist
}: {
	artist: ArtistEntity
}) => {
	const qc = useQueryClient()
	const user = qc.getQueryData<UserEntity>(USER_QUERY_KEY)
	const { toast } = useToast();
	const { uploadArtistImageMutation } = useCreateArtistImage();
	
	const form = useForm<zodEditSchema>({
		resolver: zodResolver(createArtistSchema),
		defaultValues: {
			name: artist?.name,
			cover_image: undefined,
			description: artist?.description,
			avatar: undefined
		}
	})
	
	const editArtistMutation = useMutation({
		mutationFn: async(values: ArtistAttributesType) => {
			if (!user || !values) return;
			
			const [ imageData ] = await Promise.all([
				uploadArtistImageMutation.mutateAsync(values)
			])
			
			if (!imageData) return;
			
			const updatedArtist = await updateArtist({
				userId: user.id, values
			})
			
			return updatedArtist as ArtistEntity[];
		},
		onSuccess: async(data) => {
			if (!data) return toast({
				title: "Ошибка изменения артиста. Повторите попытку позже!",
				variant: "red"
			})
			
			form.reset();
			
			toast({
				title: "Данные артиста изменены",
				description: (<ArtistEditedNotify artist={data[0]}/>),
				variant: "right"
			})
		},
		onError: e => {throw new Error(e.message)}
	})
	
	return { editArtistMutation, form }
}