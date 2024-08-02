import {
	IPlaylistImage,
	playlistImageVariants
} from "@/components/playlist/child/playlist-image/types/playlist-image-types";
import { ImageCover } from "@/ui/image-cover";

export const PlaylistImage = ({
	variant, className, playlist,
}: IPlaylistImage) => {

	if (!playlist) return;

	return (
		<div className={playlistImageVariants(({ variant, className }))}>
			<ImageCover path={playlist.image_path} title={playlist.title} />
		</div>
	)
}