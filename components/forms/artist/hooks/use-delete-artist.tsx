import { USER_QUERY_KEY } from "@/lib/query/user/user-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { MESSAGE_ERROR_SOMETHING, MESSAGE_SUCCESS_ARTIST_DELETE } from "@/lib/constants/messages/messages";
import { UserEntity } from "@/types/user";

const supabase = createClient();

type DeleteArtistQueryType = {
	values: ArtistAttributesType
}

async function deleteArtistQuery({
	values
}: DeleteArtistQueryType) {
	const { data: deletedArtist, error: deletedArtistError } = await supabase
		.from("artists")
		.delete()
		.eq('id', values.id)
		.select();

	if (deletedArtistError) throw deletedArtistError;

	return { deletedArtist }
}

export function useDeleteArtist() {
	const qc = useQueryClient()
	const user = qc.getQueryData<UserEntity>(USER_QUERY_KEY)
	
	const { toast } = useToast();
	const { refresh } = useRouter();
	const { closeDialog } = useDialog();

	const { deleteArtistImageMutation } = useDeleteArtistImage()
	const { deleteSongMutation } = useDeleteSong()
	const { deleteArtistCoverImageMutation } = useDeleteArtistCoverImage()

	const deleteArtistMutation = useMutation({
		mutationFn: async (
			values: ArtistAttributesType
		) => {
			if (user && values) {
				const [deletedAvatarFile, deletedCoverImageFile] = await Promise.all([
					deleteArtistImageMutation.mutateAsync(values),
					deleteArtistCoverImageMutation.mutateAsync(values)
				])

				const { deletedArtist } = await deleteArtistQuery({
					values: values
				})

				if (deletedArtist) {
					await deleteSongMutation.mutateAsync({
						artists: [values.id!]
					})
				}

				return deletedArtist as ArtistEntity[]
			}
		},
		onSuccess: async (data) => {
			if (data) {
				const artist = data[0];

				closeDialog();
				refresh();

				toast({
					title: MESSAGE_SUCCESS_ARTIST_DELETE,
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
				title: MESSAGE_ERROR_SOMETHING,
				variant: "red"
			})
		}
	})

	return { deleteArtistMutation }
}