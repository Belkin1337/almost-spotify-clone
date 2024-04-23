import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { PlaylistEntity } from "@/types/playlist";
import { useLoadImage } from "@/lib/hooks/image/use-load-image";
import { useCallback } from "react";
import Image from "next/image";
import { MdMusicNote } from "react-icons/md";

export const PlaylistImageItem = ({
	playlist
}: {
	playlist: PlaylistEntity
}) => {
	const { openDialog } = useDialog()
	const { data: image } = useLoadImage(playlist.image_path!)

	const handleDialog = useCallback(() => {
		openDialog({
			dialogChildren: (
				image?.url && (
					<Image
						src={image.url}
						width={660}
						height={660}
						loading="lazy"
						alt={playlist?.title || "Playlist"}
						className="w-full h-full object-cover"
					/>
				)
			)
		})
	}, [openDialog])

	return (
		image?.url ? (
			<Image
				src={image.url || "/images/liked.png"}
				width={660}
				onClick={handleDialog}
				height={660}
				loading="lazy"
				alt={playlist?.title || "Playlist"}
				className="min-w-[224px] object-cover max-w-[224px] max-h-[224px]
				rounded-md min-h-[224px] shadow-lg shadow-black	cursor-pointer"
			/>
		) : (
			<div className="flex w-[224px] shadow-lg shadow-black rounded-md bg-neutral-800 hover:scale-[1.06] hover:duration-100 duration-100 h-[224px] items-center justify-center">
				<MdMusicNote size={64} />
			</div>
		)
	)
}