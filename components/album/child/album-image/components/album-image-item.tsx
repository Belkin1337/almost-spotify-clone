import { useLoadImage } from "@/lib/hooks/image/use-load-image";
import { AlbumEntity } from "@/types/album";
import { Skeleton } from "@/ui/skeleton";
import Image from "next/image"
import { useCallback } from "react";
import { useDialog } from "@/lib/hooks/ui/use-dialog";

export const AlbumImageItem = ({
	album
}: {
	album: AlbumEntity
}) => {
	const { openDialog } = useDialog()
	const { data: image } = useLoadImage(album?.image_url!);

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
							alt={album?.title || "Album"}
							className="w-full h-full object-cover"
						/>
					</div>
				)
			)
		})
	}, [openDialog])

	return (
		<div onClick={handleDialog} className="w-[224px] h-[224px] overflow-hidden rounded-md shadow-lg shadow-black cursor-pointer hover:scale-[1.06] hover:duration-100 duration-100">
			{image ? (
				<Image
					src={image.url || "/images/liked.png"}
					width={660}
					height={660}
					loading="lazy"
					alt={album?.title || "Album"}
					className="object-cover w-full h-full"
				/>
			) : (
				<Skeleton className="object-cover w-full h-full"/>
			)}
		</div>
	)
}