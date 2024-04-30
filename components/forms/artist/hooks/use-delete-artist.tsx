import { useUserQuery } from "@/lib/query/user/user-query";
import { useMutation } from "@tanstack/react-query";
import { ArtistAttributesType } from "@/components/forms/artist/hooks/use-create-artist";
import { useDeleteArtistCoverImage } from "@/components/forms/artist/hooks/use-delete-artist-cover-image";
import { useDeleteArtistImage } from "@/components/forms/artist/hooks/use-delete-artist-image";
import { ArtistEntity } from "@/types/artist";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { useDeleteSong } from "@/components/forms/song/components/delete/hooks/use-delete-song";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { Typography } from "@/ui/typography";
import { useRouter } from "next/navigation";
import { useDialog } from "@/lib/hooks/ui/use-dialog";

const supabase = createClient();

export function useDeleteArtist() {
	const { toast } = useToast();
	const { refresh } = useRouter();
	const { closeDialog } = useDialog();

	const { deleteArtistImageMutation } = useDeleteArtistImage()
	const { deleteSongMutation } = useDeleteSong()
	const { deleteArtistCoverImageMutation } = useDeleteArtistCoverImage()
	const { data: user } = useUserQuery();

	const deleteArtistMutation = useMutation({
		mutationFn: async (
			values: ArtistAttributesType
		) => {
			if (user) {
				try {
					if (!values) return;

					const [deletedAvatarFile, deletedCoverImageFile] = await Promise.all([
						deleteArtistImageMutation.mutateAsync(values),
						deleteArtistCoverImageMutation.mutateAsync(values)
					])

					const { data: deletedArtist, error: deletedArtistError } = await supabase
						.from("artists")
						.delete()
						.eq('id', values.id)
						.select();

					if (deletedArtist) {
						await deleteSongMutation.mutateAsync({
							artists: [values.id!]
						})
					}

					if (deletedArtist && !deletedArtistError) return deletedArtist as ArtistEntity[]
				} catch (e) {
					throw e;
				}
			}
		},
		onSuccess: async (data) => {
			if (data) {
				const artist = data[0];

				closeDialog();
				refresh();

				toast({
					title: "Артист успешно удален!",
					variant: "right",
					description: (
						<Typography className="!text-black !font-bold underline">
							Удаленный артист: {artist.name}
						</Typography>
					),
				})
			}
		},
		onError: () => {
			toast({
				title: "Что-то пошло не так при удалении артиста. Повторите попытку позже!",
				variant: "red"
			})
		}
	})

	return { deleteArtistMutation }
}