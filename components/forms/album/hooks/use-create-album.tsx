import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { useMutation } from "@tanstack/react-query";
import { USER_QUERY_KEY } from "@/lib/query/user/user-query";
import { AlbumEntity } from "@/types/album";
import { useUploadAlbumImage } from "@/components/forms/album/hooks/use-upload-album-image";
import { AlbumCreateNotify } from "@/components/notifies/actions/album/album-create-notify";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { UserEntity } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query"

const supabase = createClient();

export type AlbumAttributes = {
	title: string;
	artists: Array<string>;
	image_url: any;
	songs: Array<string>;
};

type CreateAlbumQueryType = {
	userId: string,
	title: string,
	imagePath: string
}

type CreateAlbumSongsQueryType = {
	songId: string,
	albumId: string
}

type CreateAlbumArtistsQueryType = {
	albumId: string,
	artistId: string
}

async function createAlbumQuery({
	userId,
	title,
	imagePath
}: CreateAlbumQueryType) {
	const { data: createdAlbum, error: albumError } = await supabase
		.from("albums")
		.insert({ user_id: userId, title: title, image_url: imagePath, })
		.select()

	if (albumError) throw albumError;

	const data = createdAlbum as AlbumEntity[];

	return { data };
}

async function createAlbumArtistsQuery({ albumId, artistId }: CreateAlbumArtistsQueryType) {
	const { error: albumArtistsTableError } = await supabase
		.from("album_artists")
		.insert({ album_id: albumId, artist_id: artistId })

	if (albumArtistsTableError) throw albumArtistsTableError;
}

async function createAlbumSongsQuery({ songId, albumId }: CreateAlbumSongsQueryType) {
	const { error: songAlbumsTableError } = await supabase
		.from("song_albums")
		.insert({ song_id: songId, album_id: albumId })

	if (songAlbumsTableError) throw songAlbumsTableError;
}

export function useCreateAlbum() {
	const qc = useQueryClient()
	const user = qc.getQueryData<UserEntity>(USER_QUERY_KEY)
	
	const { uploadAlbumImageMutation } = useUploadAlbumImage();
	const { toast } = useToast();

	const createAlbumMutation = useMutation({
		mutationFn: async (values: AlbumAttributes) => {
			if (user) {
				try {
					const [imageData] = await Promise.all([
						uploadAlbumImageMutation.mutateAsync(values),
					]);

					if (!values) return;

					const { data } = await createAlbumQuery({
						userId: user?.id,
						imagePath: imageData.path,
						title: values.title
					})

					const albumId = data[0]?.id;

					for (let i = 0; i < values.artists?.length; i++) {
						const artistId = values.artists ? values.artists[i] : 0;

						if (artistId) {
							await createAlbumArtistsQuery({
								albumId: albumId,
								artistId: artistId
							})
						}
					}

					for (let i = 0; i < values.songs?.length; i++) {
						const songId = values.songs ? values.songs[i] : 0;

						if (songId) {
							await createAlbumSongsQuery({
								albumId: albumId,
								songId: songId
							})
						}
					}

					return data as AlbumEntity[]
				} catch (e) {
					throw e;
				}
			}
		},
		onSuccess: async (data) => {
			if (data) {
				const album = data[0];

				toast({
					title: "Альбом создан!",
					variant: "right",
					description: (<AlbumCreateNotify album={album} />)
			})
			}
		},
		onError: () => {
			toast({
				title: "Ошибка создания трека. Повторите попытку позже!",
				variant: "red"
			})
		}
	});

	return { createAlbumMutation };
}