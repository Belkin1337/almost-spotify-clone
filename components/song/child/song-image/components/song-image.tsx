import { useLoadImage } from "@/lib/hooks/image/use-load-image"
import { useCallback } from "react";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { ISongImageItem, songImageVariants } from "@/components/song/child/song-image/types/song-image-types";
import Image from "next/image"
import { DialogImage } from "@/ui/dialog-image";

export const SongImageItem = ({
	variant,
	className,
	song,
	children
}: ISongImageItem) => {
	const { openDialog } = useDialog()
	const { data: image } = useLoadImage(song?.image_path);

	const handleDialog = useCallback(() => {
		if (image?.url) {
			openDialog({
				dialogChildren: <DialogImage imageUrl={image.url} title={song.title}/>
			})
		}
	}, [image?.url, song?.title, openDialog])

	return (
		<div className={songImageVariants(({ variant, className, }))}>
			{variant === "page" ? (
				<Image
					onClick={handleDialog}
					src={image?.url || "/images/liked.png"}
					width={660}
					height={660}
					loading="lazy"
					alt={song?.title || "Album"}
					className="object-cover w-full h-full"
				/>
			) : (
				<>
					<Image
						fill
						src={image?.url || "/images/liked.png"}
						alt={song?.title || "song"}
						loading="lazy"
						draggable="false"
						className="object-cover w-full h-full rounded-md"
					/>
					{children}
				</>
			)}
		</div>
	)
}