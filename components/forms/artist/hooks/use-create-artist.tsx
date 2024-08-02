import { useUserQuery } from "@/lib/query/user/user-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { ArtistEntity } from "@/types/artist";
import { useCreateArtistImage } from "@/components/forms/artist/hooks/use-create-artist-image";
import { useCreateArtistCoverImage } from "@/components/forms/artist/hooks/use-create-artist-cover-image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createArtistSchema } from "@/components/forms/artist/schemas/schema-artist";
import { zodArtistSchema } from "@/components/forms/artist/components/create-artist-form";
import { userArtistsQueryKey } from "@/lib/querykeys/user";
import { ArtistCreatedNotify } from "@/components/notifies/actions/artist/artist-created-notify";
import { useToast } from "@/lib/hooks/ui/use-toast";

const supabase = createClient();

export type ArtistAttributesType = {
	id?: string,
	name?: string,
	description?: string,
	avatar_path?: string,
	avatar?: File | undefined,
	cover_image?: File | undefined,
	cover_image_path?: string
}

type CreateArtistQueryType = {
	userId: string,
	values: ArtistAttributesType,
	imagePath: string,
	imageCoverPath?: string
}

async function createArtistQuery({
	imageCoverPath,
	values,
	userId,
	imagePath
}: CreateArtistQueryType) {
	const imageCover = imageCoverPath ? imageCoverPath : null;

	const { data: createdArtist, error } = await supabase
		.from("artists")
		.insert({
			user_id: userId,
			name: values.name,
			description: values.description,
			avatar_path: imagePath,
			cover_image_path: imageCover
		})
		.select()

	if (error) throw error;

	return { createdArtist }
}

export function useCreateArtist() {
	const queryClient = useQueryClient();

	const { toast } = useToast();
	const { data: user } = useUserQuery();
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
		mutationFn: async (
			values: ArtistAttributesType
		) => {
			if (user) {
				const [imageData, imageCoverData] = await Promise.all([
					uploadArtistImageMutation.mutateAsync(values),
					uploadArtistCoverImageMutation.mutateAsync(values)
				])

				if (!imageData) return;

				const { createdArtist } = await createArtistQuery({
					imageCoverPath: imageCoverData?.path,
					imagePath: imageData.path,
					userId: user.id,
					values: values
				})

				if (createdArtist) return createdArtist as ArtistEntity[];
			}
		},
		onSuccess: async (data) => {
			if (data) {
				const artist = data[0];

				form.reset();

				toast({
					title: "Артист создан",
					variant: "right",
					description: (
						<ArtistCreatedNotify artist={artist}/>
					)
				})
			}

			await queryClient.invalidateQueries({
				queryKey: userArtistsQueryKey(user?.id!)
			})
		},
		onError: () => {
			toast({
				title: "Ошибка создания артиста. Повторите попытку позже!",
				variant: "red"
			})
		}
	})

	return { form, createArtistMutation }
}