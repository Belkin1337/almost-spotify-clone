import { useLoadImage } from "@/lib/hooks/image/use-load-image";
import { AlbumEntity } from "@/types/album";
import Image from "next/image"
import { useCallback } from "react";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { DialogImage } from "@/ui/dialog-image";

export const AlbumImageItem = ({
	album
}: {
	album: AlbumEntity
}) => {
	const { openDialog } = useDialog()
	const { data: image } = useLoadImage(album?.image_url!);

	const handleDialog = useCallback(() => {
		if (image?.url) {
			openDialog({
				dialogChildren: (<DialogImage imageUrl={image.url} title={album.title}/>)
			})
		}
	}, [album.title, image?.url, openDialog])

	return (
		<div
			onClick={handleDialog}
			className="w-[224px] h-[224px] overflow-hidden rounded-md shadow-lg shadow-black cursor-pointer hover:scale-[1.06] hover:duration-100 duration-100"
		>
			<Image
				src={image?.url || "/images/liked.png"}
				width={660}
				height={660}
				loading="lazy"
				alt={album?.title || ""}
				className="object-cover w-full h-full"
			/>
		</div>
	)
}