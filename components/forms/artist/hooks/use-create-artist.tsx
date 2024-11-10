import { USER_QUERY_KEY } from "@/lib/query/user/user-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCreateArtistImage } from "@/components/forms/artist/hooks/use-create-artist-image";
import { useCreateArtistCoverImage } from "@/components/forms/artist/hooks/use-create-artist-cover-image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createArtistSchema } from "@/components/forms/artist/schemas/schema-artist";
import { zodArtistSchema } from "@/components/forms/artist/components/create-artist-form";
import { userArtistsQueryKey } from "@/lib/querykeys/user";
import { ArtistCreatedNotify } from "@/components/notifies/actions/artist/artist-created-notify";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { UserEntity } from "@/types/user";
import { createArtist } from "@/components/forms/artist/queries/create-artist";

export type ArtistAttributesType = {
	id?: string,
	name?: string,
	description?: string,
	avatar_path?: string,
	avatar?: File | undefined,
	cover_image?: File | undefined,
	cover_image_path?: string
}

export function useCreateArtist() {
	const { toast } = useToast();
	const qc = useQueryClient()
	const user = qc.getQueryData<UserEntity>(USER_QUERY_KEY)
	
	const { uploadArtistImageMutation } = useCreateArtistImage();
	const { uploadArtistCoverImageMutation } = useCreateArtistCoverImage();
	
	const form = useForm<zodArtistSchema>({
		resolver: zodResolver(createArtistSchema),
		defaultValues: {
			name: '',
			description: '',
			cover_image: null,
			avatar: null
		}
	});
	
	const createArtistMutation = useMutation({
		mutationFn: async(values: ArtistAttributesType) => {
			if (!user) return;
			
			const [ imageData, imageCoverData ] = await Promise.all([
				uploadArtistImageMutation.mutateAsync(values),
				uploadArtistCoverImageMutation.mutateAsync(values)
			])
			
			if (!imageData) return;
			
			return createArtist({
				imageCoverPath: imageCoverData?.path, imagePath: imageData.path, userId: user.id, values: values
			})
		},
		onSuccess: async(data) => {
			if (!data) return toast({
				title: "Ошибка создания артиста. Повторите попытку позже!", variant: "red"
			})
			
			const artistId = data.id;
			
			form.reset();
			
			toast({
				title: "Артист создан",
				variant: "right",
				description: (
					<ArtistCreatedNotify artistId={artistId}/>
				)
			})
			
			return qc.invalidateQueries({
				queryKey: userArtistsQueryKey(user?.id!)
			})
		},
		onError: e => {throw new Error(e.message)}
	})
	
	return { form, createArtistMutation }
}