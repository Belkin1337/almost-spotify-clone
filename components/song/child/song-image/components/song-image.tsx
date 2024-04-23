import { useLoadImage } from "@/lib/hooks/image/use-load-image"
import { useCallback } from "react";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { ISongImageItem, songImageVariants } from "@/components/song/child/song-image/types/song-image-types";
import Image from "next/image"

export const SongImageItem = ({
	variant,
	className,
	song,
	children
}: ISongImageItem) => {
	const { openDialog } = useDialog()
	const { data: image } = useLoadImage(song?.image_path!);

	const handleDialog = useCallback(() => {
		openDialog({
			dialogChildren: (
				image?.url && (
					<div className="w-[448px] h-[448px] overflow-hidden rounded-md">
						<Image
							src={image.url}
							width={660}
							height={660}
							loading="lazy"
							alt={song?.title || "Song"}
							className="w-full h-full object-cover"
						/>
					</div>
				)
			)
		})
	}, [openDialog])

	return (
		<div className={songImageVariants(({
			variant,
			className,
		}))}>
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