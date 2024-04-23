import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { useCreateArtistImage } from "@/components/forms/artist/hooks/use-create-artist-image";
import { useUserQuery } from "@/lib/query/user/user-query";
import { ArtistAttributes } from "@/components/forms/artist/hooks/use-create-artist";
import { useMutation } from "@tanstack/react-query";
import { ArtistEntity } from "@/types/artist";

const supabase = createClient();

export const useEditArtist = () => {
	const { data: user } = useUserQuery();

	const { uploadArtistImage } = useCreateArtistImage();

	const editArtist = useMutation({
		mutationFn: async (values: ArtistAttributes) => {
			if (user) {
				try {
					const [imageData] = await Promise.all([
						uploadArtistImage.mutateAsync(values)
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

					if (newArtist && !error) {
						return newArtist as ArtistEntity[];
					}
				} catch (e) {
					throw e;
				}
			}
		}
	})

	return {
		editArtist
	}
}