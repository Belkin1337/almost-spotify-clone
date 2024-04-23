import Image from "next/image";
import { nullAvatarImage } from "@/lib/constants/files/invalid-or-null-images";
import {
	IPlaylistImage,
	playlistImageVariants
} from "@/components/playlist/child/playlist-image/types/playlist-image-types";
import { useLoadImage } from "@/lib/hooks/image/use-load-image";

export const PlaylistImage = ({
	variant,
	className,
	playlist,
	...props
}: IPlaylistImage) => {
	const { data: image } = useLoadImage(playlist?.image_path!)

	if (!playlist) return;

	return (
		<div className={playlistImageVariants(({ variant, className }))} {...props}>
			<Image
				src={image?.url as string || nullAvatarImage}
				alt={playlist?.title}
				title={playlist?.title}
				width={64}
				height={64}
				loading="lazy"
				className={`'w-full h-full object-cover`}
			/>
		</div>
	)
}