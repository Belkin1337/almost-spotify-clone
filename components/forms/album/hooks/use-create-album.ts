import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { useMutation } from "@tanstack/react-query";
import { useUserQuery } from "@/lib/query/user/user-query";
import { AlbumEntity } from "@/types/album";
import { useUploadAlbumImage } from "@/components/forms/album/hooks/use-upload-album-image";

export type AlbumAttributes = {
	title: string;
	artists: Array<string>;
	image_url: any;
	songs: Array<string>;
};

const supabase = createClient();

export function useCreateAlbum() {
	const { data: user } = useUserQuery();
	const { uploadAlbumImage } = useUploadAlbumImage();

	const createAlbum = useMutation({
		mutationFn: async (
			values: AlbumAttributes
		) => {
			try {
				const [imageData] = await Promise.all([
					uploadAlbumImage.mutateAsync(values),
				]);

				if (!values) return;

				const { data: createdAlbum, error: albumError } = await supabase
					.from("albums")
					.insert({
						user_id: user?.id,
						title: values.title,
						image_url: imageData?.path,
					})
					.select()

				if (albumError) {
					console.log(albumError.message);
				} else {
					const albumId = createdAlbum[0]?.id;

					for (let i = 0; i < values.artists?.length; i++) {
						const artistId = values.artists ? values.artists[i] : 0;

						const { error: albumArtistsTableError } = await supabase
							.from("album_artists")
							.insert({
								album_id: albumId,
								artist_id: artistId
							})

						if (albumArtistsTableError) {
							console.log(albumArtistsTableError.message)
							throw albumArtistsTableError;
						}
					}

					for (let i = 0; i < values.songs?.length; i++) {
						const songId = values.songs ? values.songs[i] : 0;

						const { error: songAlbumsTableError } = await supabase
							.from("song_albums")
							.insert({
								song_id: songId,
								album_id: albumId
							})

						if (songAlbumsTableError) {
							console.log(songAlbumsTableError.message)
							throw songAlbumsTableError;
						}
					}

					return createdAlbum as AlbumEntity[]
				}
			} catch (e) {
				throw e;
			}
		},
	});

	return {
		createAlbum,
	};
}
