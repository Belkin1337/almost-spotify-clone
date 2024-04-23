import { useForm } from "react-hook-form";
import { Form } from "@/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useRef } from "react";
import { useUserQuery } from "@/lib/query/user/user-query";
import { SongFormFields } from "./fields/components/fields";
import { useEditSong } from "@/components/forms/song/hooks/use-edit-song";
import { SongEntity } from "@/types/song";
import { useSongArtistListQuery } from "@/lib/query/song/song-artist-list-query";
import { songSchema } from "@/components/forms/song/schemas/schema-song";
import { zodSongSchema } from "@/components/forms/song/components/create-song";

export const EditSongForm = ({
	song
}: {
	song: SongEntity
}) => {
	const { data: user } = useUserQuery();
	const { editSongMutation } = useEditSong();
	const { data: artistSongId } = useSongArtistListQuery(song?.id)

	const imageRef = useRef<HTMLInputElement>(null)

	const form = useForm<zodSongSchema>({
		resolver: zodResolver(songSchema),
		defaultValues: {
			title: song ? song?.title : "",
			artists: song ? [artistSongId?.firstArtist.id] : [],
		}
	});

	const onSubmit = useCallback(async (
		values: zodSongSchema
	) => {
		if (!values) return;

		await editSongMutation.mutateAsync({
			id: song?.id,
			title: values.title,
			artists: values.artists,
			genre: values.genre
		})
	}, [editSongMutation, song?.id])

	if (!user) return;

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-6 p-6 min-w-[1200px]">
				<SongFormFields
					form={form}
					type="edit"
					isLoading={editSongMutation.isPending}
					song={song!}
					refs={{ imageRef: imageRef }}
				/>
			</form>
		</Form>
	)
}