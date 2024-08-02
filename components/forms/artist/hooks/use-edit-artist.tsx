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

type UpdateArtistQueryType = {
	userId: string,
	values: ArtistAttributesType
}

async function updateArtistQuery({
	userId,
	values
}: UpdateArtistQueryType) {
	const { data: updatedArtist, error: updatedArtistErr } = await supabase
		.from("artists")
		.update({
			user_id: userId,
			title: values.name,
			description: values.description,
			avatar_path: values.avatar_path,
			cover_image_path: values.cover_image_path,
		})
		.eq('id', values.id)
		.select();

	if (updatedArtistErr) throw updatedArtistErr;

	return { updatedArtist }
}

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

	const editArtistMutation = useMutation({
		mutationFn: async (
			values: ArtistAttributesType
		) => {
			if (user && values) {
				const [imageData] = await Promise.all([
					uploadArtistImageMutation.mutateAsync(values)
				])

				if (!imageData) return;

				const { updatedArtist } = await updateArtistQuery({
					userId: user.id,
					values: values
				})

				return updatedArtist as ArtistEntity[];
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

	return { editArtistMutation, form }
}