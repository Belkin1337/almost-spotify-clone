import { useUserQuery } from "@/lib/query/user/user-query";
import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { SongAttributes, SongEntity } from "@/types/song";
import { useUploadSongImage } from "./use-upload-song-image";
import { SongEdited } from "@/components/notifies/actions/song-edited";
import { useToast } from "@/lib/hooks/ui/use-toast";

const supabase = createClient();

export function useEditSong() {
	const { toast } = useToast()
	const { data: user } = useUserQuery();
	const { createSongImageMutation } = useUploadSongImage();

	const editSongMutation = useMutation({
		mutationFn: async (
			values: SongAttributes
		) => {
			if (values.image_path) {
				try {
					const { data: newSong, error: supabaseErr } = await supabase
						.from("songs")
						.update({
							user_id: user?.id,
							title: values.title,
							artists: values.artists,
						})
						.eq("id", values.id)
						.select()

					if (supabaseErr) return;

					return newSong as SongEntity[]
				} catch (e) {
					throw e;
				}
			}
		},
		onSuccess: async (data) => {
			if (data) {
				toast({
					title: "Трек изменен!",
					variant: "right",
					description: (
						<SongEdited song={data[0]}/>
					),
				})
			}
		},
		onError: () => {
			toast({
				title: "Произошла ошибка при загрузке трека",
				variant: "red"
			})
		}
	});

	return { editSongMutation };
}