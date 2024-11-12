import { useForm } from "react-hook-form";
import { z } from "zod";
import { updatePlaylistSchema } from "@/components/forms/playlist/schemas/schema-playlist";
import { useLoadImage } from "@/lib/hooks/image/use-load-image";
import { PlaylistItemProps } from "@/components/forms/playlist/types/playlist-types";

export type zodPlaylistSchema = z.infer<typeof updatePlaylistSchema>;

export const useUpdatePlaylist = ({
	playlist
}: PlaylistItemProps) => {
	const { data: image } = useLoadImage(playlist?.image_path || '');

	const form = useForm<zodPlaylistSchema>({
		defaultValues: {
			title: playlist ? playlist.title : '',
			description: playlist ? playlist.description : '',
			image: playlist ? image?.url : ''
		}
	})

	return { form }
}