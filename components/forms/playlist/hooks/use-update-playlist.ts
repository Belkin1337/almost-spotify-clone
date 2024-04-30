import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updatePlaylistSchema } from "@/components/forms/playlist/schemas/schema-playlist";
import { PlaylistEntity } from "@/types/playlist";
import { useLoadImage } from "@/lib/hooks/image/use-load-image";

export type zodPlaylistSchema = z.infer<typeof updatePlaylistSchema>;

export const useUpdatePlaylist = ({
	playlist
}: {
	playlist: PlaylistEntity | undefined
}) => {
	const { data: image } = useLoadImage(playlist?.image_path || '');

	const form = useForm<zodPlaylistSchema>({
		defaultValues: {
			title: playlist ? playlist.title : '',
			description: playlist ? playlist.description : '',
			image: playlist ? image?.url : ''
		}
	})

	const updatePlaylistNameMutation = useMutation({
		mutationFn: async () => {
			try {

			} catch (e) {
				throw e;
			}
		},
		onSuccess: async () => {

		},
		onError: () => {

		}
	})

	const updatePlaylistDescriptionMutation = useMutation({
		mutationFn: async () => {
			try {

			} catch (e) {
				throw e;
			}
		},
		onSuccess: async () => {

		},
		onError: () => {

		}
	})

	const updatePlaylistImageMutation = useMutation({
		mutationFn: async () => {
			try {

			} catch (e) {
				throw e;
			}
		},
		onSuccess: async () => {

		},
		onError: () => {

		}
	})

	return {
		updatePlaylistNameMutation,
		updatePlaylistDescriptionMutation,
		updatePlaylistImageMutation,
		form
	}
}