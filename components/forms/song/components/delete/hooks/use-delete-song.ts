import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { SongAttributes, SongEntity } from "@/types/song";
import { useDeleteSongFile } from "@/components/forms/song/components/delete/hooks/use-delete-song-file";
import { useDeleteSongImage } from "@/components/forms/song/components/delete/hooks/use-delete-song-image";
import { USER_QUERY_KEY, useUserQuery } from "@/lib/query/user/user-query";
import { userSongsQueryKey } from "@/lib/querykeys/user";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { useRouter } from "next/navigation";
import { UserEntity } from "@/types/user";

const supabase = createClient();

async function deleteSongQuery(songId: string) {
	const { data: deletedSong, error: deletedSongErr } = await supabase
	.from("songs")
	.delete()
	.eq('id', songId)
	.select();
	
	if (deletedSongErr) throw deletedSong;
	
	return { deletedSong };
}

export function useDeleteSong() {
	const qc = useQueryClient()
	const user = qc.getQueryData<UserEntity>(USER_QUERY_KEY)
	const { toast } = useToast();
	const { closeDialog } = useDialog();
	const { refresh } = useRouter();
	
	const { deleteSongFileMutation } = useDeleteSongFile()
	const { deleteSongImageMutation } = useDeleteSongImage()
	
	const deleteSongMutation = useMutation({
		mutationFn: async(
			values: SongAttributes
		) => {
			if (!user) return
			
			await Promise.all([
				deleteSongFileMutation.mutateAsync(values),
				deleteSongImageMutation.mutateAsync(values)
			])
			
			if (values.id) {
				const { deletedSong } = await deleteSongQuery(values.id)
				
				return deletedSong as SongEntity[];
			}
		},
		onSuccess: async(data) => {
			if (!data) return toast({
				title: "Что-то пошло не так при удалении трека. Повторите попытку позже!",
				variant: "red"
			})
			
			const song = data[0];
			
			closeDialog();
			refresh();
			
			if (song) {
				toast({
					title: "Трек успешно удален!",
					variant: "right"
				})
			}
			
			await qc.invalidateQueries({
				queryKey: userSongsQueryKey(user?.id!)
			})
		},
		onError: e => {throw new Error(e.message)}
	})
	
	return { deleteSongMutation }
}