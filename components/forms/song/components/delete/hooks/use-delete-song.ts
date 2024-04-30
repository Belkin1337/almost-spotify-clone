import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { SongAttributes, SongEntity } from "@/types/song";
import { useDeleteSongFile } from "@/components/forms/song/components/delete/hooks/use-delete-song-file";
import { useDeleteSongImage } from "@/components/forms/song/components/delete/hooks/use-delete-song-image";
import { useUserQuery } from "@/lib/query/user/user-query";
import { userSongsQueryKey } from "@/lib/querykeys/user";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { useRouter } from "next/navigation";

const supabase = createClient();

export function useDeleteSong() {
	const queryClient = useQueryClient()

	const { data: user } = useUserQuery();
	const { toast } = useToast();
	const { closeDialog } = useDialog();
	const { refresh } = useRouter();

	const { deleteSongFile } = useDeleteSongFile()
	const { deleteSongImage } = useDeleteSongImage()

	const deleteSongMutation = useMutation({
		mutationFn: async (
			values: SongAttributes
		) => {
			if (user) {
				try {
					await Promise.all([deleteSongFile.mutateAsync(values), deleteSongImage.mutateAsync(values)])

					const { data: deletedSong, error } = await supabase
						.from("songs")
						.delete()
						.eq('id', values.id)
						.select();

					if (deletedSong && !error) {
						return deletedSong as SongEntity[];
					}
				} catch (e) {
					throw e;
				}
			}
		},
		onSuccess: async (data, variables) => {
			if (data) {
				const song = data[0];

				closeDialog();
				refresh();

				if (song) {
					toast({
						title: "Трек успешно удален!",
						variant: "right"
					})
				}
			}

			await queryClient.invalidateQueries({
				queryKey: userSongsQueryKey(user?.id!)
			})
		},
		onError: () => {
			toast({
				title: "Что-то пошло не так при удалении трека. Повторите попытку позже!",
				variant: "red"
			})
		}
	})

	return { deleteSongMutation }
}