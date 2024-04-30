import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { useCreateArtistImage } from "@/components/forms/artist/hooks/use-create-artist-image";
import { useUserQuery } from "@/lib/query/user/user-query";
import { ArtistAttributesType } from "@/components/forms/artist/hooks/use-create-artist";
import { useMutation } from "@tanstack/react-query";
import { ArtistEntity } from "@/types/artist";
import { ArtistEditedNotify } from "@/components/notifies/actions/artist/artist-edited-notify";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createArtistSchema } from "@/components/forms/artist/schemas/schema-artist";
import { z } from "zod";

const supabase = createClient();

export type zodEditSchema = z.infer<typeof createArtistSchema>

export const useEditArtist = ({
	artist
}: {
	artist: ArtistEntity
}) => {
	const { data: user } = useUserQuery();
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

	const editArtist = useMutation({
		mutationFn: async (
			values: ArtistAttributesType
		) => {
			if (user) {
				try {
					const [imageData] = await Promise.all([
						uploadArtistImageMutation.mutateAsync(values)
					])

					if (!imageData) return;

					const { data: newArtist, error } = await supabase
						.from("artists")
						.update({
							user_id: user.id,
							title: values.name,
							description: values.description,
							avatar_path: values.avatar_path,
							cover_image_path: values.cover_image_path,
						})
						.eq('id', values.id)
						.select();

					if (error) return;

					if (newArtist && !error) return newArtist as ArtistEntity[];
				} catch (e) {
					throw e;
				}
			}
		},
		onSuccess: async (data) => {
			if (data) {
				form.reset();

				toast({
					title: "Данные артиста изменены",
					description: (<ArtistEditedNotify artist={data[0]}/>),
					variant: "right"
				})
			}
		},
		onError: () => {
			toast({
				title: "Ошибка изменения артиста. Повторите попытку позже!",
				variant: "red"
			})
		}
	})

	return { editArtist, form }
}