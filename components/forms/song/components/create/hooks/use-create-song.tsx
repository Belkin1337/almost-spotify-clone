import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { USER_QUERY_KEY } from "@/lib/query/user/user-query";
import { SongAttributes, SongEntity } from "@/types/song";
import { useUploadSongImage } from "./use-upload-song-image";
import { useUploadSongFile } from "./use-upload-song-file";
import { userSongsQueryKey } from "@/lib/querykeys/user";
import { artistSongsQueryKey } from "@/lib/querykeys/artist";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { songSchema } from "@/components/forms/song/schemas/schema-song";
import { SongCreatedNotify } from "@/components/notifies/actions/song/song-created-notify";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { songPreviewQueryKey } from "@/lib/querykeys/song";
import { useCreateSingle } from "@/components/forms/single/hooks/use-create-single";
import { zodSongSchema } from "@/components/forms/song/components/create/types/create-form-types";
import { UserEntity } from "@/types/user";

const supabase = createClient();

type CreateSongQueryType = {
	userId: string,
	values: SongAttributes,
	imagePath: string,
	songPath: string
}

type CreateSongArtistsQueryType = {
	artistId: string,
	songId: string
}

type CreateSongGenresQueryType = {
	values: SongAttributes,
	songId: string
}

async function createSongQuery({
	userId, songPath, values, imagePath
}: CreateSongQueryType) {
	const { data: newSong, error: supabaseError } = await supabase
	.from("songs")
	.insert({
		user_id: userId,
		title: values.title,
		genre: values.genre,
		image_path: imagePath,
		song_path: songPath,
	})
	.select()
	
	if (supabaseError) throw new Error(supabaseError.message);
	
	return { newSong }
}

async function createSongArtistsQuery({
	songId,
	artistId
}: CreateSongArtistsQueryType) {
	const { error } = await supabase
	.from("song_artists")
	.insert({ song_id: songId, artist_id: artistId })
	
	if (error) throw new Error(error.message);
}

async function createSongGenresQuery({
	songId, values
}: CreateSongGenresQueryType) {
	const { error: genreSongError } = await supabase
	.from("song_genres")
	.insert({ song_id: songId, genre_id: values.genre })
	
	if (genreSongError) throw new Error(genreSongError.message);
}

export function useCreateSong() {
	const queryClient = useQueryClient();
	const [ artistId, setArtistId ] = useState('')
	const { toast } = useToast();
	const qc = useQueryClient()
	const user = qc.getQueryData<UserEntity>(USER_QUERY_KEY)
	
	const { createSongImageMutation } = useUploadSongImage();
	const { createSongFileMutation } = useUploadSongFile();
	const { createSingleMutation } = useCreateSingle();
	
	const form = useForm<zodSongSchema>({
		resolver: zodResolver(songSchema),
		defaultValues: {
			title: "", artists: [], genre: "", image: null, song: null, single: false
		}
	});
	
	const createSongMutation = useMutation({
		mutationFn: async(values: SongAttributes) => {
			if (!user) return;
			
			const [ songData, imageData ] = await Promise.all([
				createSongFileMutation.mutateAsync(values),
				createSongImageMutation.mutateAsync(values),
			]);
			
			if (!songData || !imageData) return;
			
			const { newSong } = await createSongQuery({
				userId: user.id,
				imagePath: imageData.path,
				songPath: songData.path,
				values
			})
			
			if (newSong && values.artists) {
				setArtistId(values.artists[0]);
				
				const song: SongEntity = newSong[0];
				
				for (let i = 0; i < values.artists?.length; i++) {
					const artistId = values.artists ? values.artists[i] : 0;
					
					await createSongArtistsQuery({
						artistId: artistId.toString(),
						songId: song.id,
					})
				}
				
				await createSongGenresQuery({
					songId: song.id,
					values: values
				})
				
				if (values.single === true) {
					await createSingleMutation.mutateAsync({
						song: song,
						values: values,
						imageData: imageData
					})
				}
				
				return newSong as SongEntity[]
			}
		},
		onSuccess: async(data) => {
			if (!data) return toast({
				title: "Ошибка создания трека. Повторите попытку позже!",
				variant: "red"
			})
			
			form.reset();
			
			queryClient.removeQueries({
				queryKey: songPreviewQueryKey
			})
			
			toast({
				title: "Трек создан!",
				variant: "right",
				description: (
					<SongCreatedNotify song={data[0]}/>
				),
			})
			
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: userSongsQueryKey(user?.id!)
				}),
				queryClient.invalidateQueries({
					queryKey: artistSongsQueryKey(artistId)
				})
			])
		},
		onError: e => {throw new Error(e.message)}
	})
	
	return { form, createSongMutation }
}