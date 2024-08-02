import { ISongImageItem, songImageVariants } from "@/components/song/child/song-image/types/song-image-types";
import { ImageCover } from "@/ui/image-cover";

export const SongImageItem = ({
	variant,
	className,
	song,
	children
}: ISongImageItem) => {

	if (!song) return;

	return (
		<div className={songImageVariants(({ variant, className }))}>
			{variant !== "page" ? (
				<>
					<ImageCover path={song.image_path} title={song.title}/>
					{children}
				</>
			) : (
				<ImageCover
					isDialog
					path={song.image_path}
					title={song.title}
				/>
			)}
		</div>
	)
}