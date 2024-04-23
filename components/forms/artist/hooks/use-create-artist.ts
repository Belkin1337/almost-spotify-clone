import { useUserQuery } from "@/lib/query/user/user-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { ArtistEntity } from "@/types/artist";
import { useCreateArtistImage } from "@/components/forms/artist/hooks/use-create-artist-image";
import { useCreateArtistCoverImage } from "@/components/forms/artist/hooks/use-create-artist-cover-image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createArtistSchema } from "@/components/forms/artist/schemas/schema-artist";
import { zodArtistSchema } from "@/components/forms/artist/components/create-artist";
import { userArtistsQueryKey } from "@/lib/querykeys/user";

const supabase = createClient();

export type ArtistAttributes = {
	id?: string,
	name?: string,
	description?: string,
	avatar_path?: string,
	avatar?: File | undefined,
	cover_image?: File | undefined,
	cover_image_path?: string
}

export function useCreateArtist() {
	const queryClient = useQueryClient();
	const { data: user } = useUserQuery();

	const { uploadArtistImage } = useCreateArtistImage();
	const { uploadArtistCoverImage } = useCreateArtistCoverImage();

	const form = useForm<zodArtistSchema>({
		resolver: zodResolver(createArtistSchema),
		defaultValues: {
			name: '',
			description: '',
			cover_image: null,
			avatar: null
		}
	});

	const createArtist = useMutation({
		mutationFn: async (
			values: ArtistAttributes
		) => {
			if (user) {
				try {
					const [imageData, imageCoverData] = await Promise.all([
						uploadArtistImage.mutateAsync(values),
						uploadArtistCoverImage.mutateAsync(values)
					])

					if (!imageData) return;

					const { data: createdArtist, error } = await supabase
						.from("artists")
						.insert({
							user_id: user.id,
							name: values.name,
							description: values.description,
							avatar_path: imageData?.path,
							cover_image_path: imageCoverData?.path
						})
						.select()

					if (error) {
						return;
					} else if (createdArtist && !error) {
						return createdArtist as ArtistEntity[];
					}
				} catch (e) {
					throw e;
				}
			}
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: userArtistsQueryKey(user?.id!)
			})
		}
	})

	return {
		form,
		createArtist
	}
}