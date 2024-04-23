import { useUserQuery } from "@/lib/query/user/user-query";
import { useMutation } from "@tanstack/react-query";
import { ArtistAttributes } from "@/components/forms/artist/hooks/use-create-artist";
import { useDeleteArtistCoverImage } from "@/components/forms/artist/hooks/use-delete-artist-cover-image";
import { useDeleteArtistImage } from "@/components/forms/artist/hooks/use-delete-artist-image";
import { ArtistEntity } from "@/types/artist";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { useDeleteSong } from "@/components/forms/song/hooks/use-delete-song";

const supabase = createClient();

export function useDeleteArtist() {
	const { deleteArtistImage } = useDeleteArtistImage()
	const { deleteSong } = useDeleteSong()
	const { deleteArtistCoverImage } = useDeleteArtistCoverImage()
	const { data: user } = useUserQuery();

	const deleteArtist = useMutation({
		mutationFn: async (values: ArtistAttributes) => {
			if (user) {
				try {
					const [deletedAvatarFile, deletedCoverImageFile] = await Promise.all([
						deleteArtistImage.mutateAsync(values),
						deleteArtistCoverImage.mutateAsync(values)
					])

					const { data: deletedArtist, error: deletedArtistError } = await supabase
						.from("artists")
						.delete()
						.eq('id', values.id)
						.select();

					if (values && deletedArtist) {
						await deleteSong.mutateAsync({
							artists: [values.id!]
						})
					} else {
						throw new Error;
					}

					if (deletedArtist && !deletedArtistError) {
						console.log(deletedArtistError, deletedArtist);
						return deletedArtist as ArtistEntity[]
					}
				} catch (e) {
					throw e;
				}
			}
		}
	})

	return {
		deleteArtist
	}
}