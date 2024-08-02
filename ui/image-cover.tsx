import Image from "next/image"
import { HTMLAttributes, useCallback } from "react"
import { nullAvatarImage } from "@/lib/constants/files/invalid-or-null-images";
import { useLoadImage } from "@/lib/hooks/image/use-load-image";
import { SkeletonSongImage } from "@/components/skeletons/song/skeleton-song-image";
import { NoteIcon } from "@/ui/icons/note-icon";
import { DialogImage } from "@/ui/dialog-image";
import { useDialog } from "@/lib/hooks/ui/use-dialog";

const NullMusicImage = () => {
	return (
		<div className="w-[224px] h-[224px] rounded-md flex items-center justify-center">
			<NoteIcon type="medium"/>
		</div>
	)
}

interface IImageCover extends HTMLAttributes<HTMLImageElement> {
	path?: string,
	title?: string,
	isDialog?: boolean
};

export const ImageCover = ({
	path,
	title,
	isDialog
}: IImageCover) => {
	const { openDialog } = useDialog()
	const { data, isLoading } = useLoadImage(path)

	const image = data ? data.url : nullAvatarImage
	const replace = title ? title : "...";

	const handleDialog = useCallback(() => {
		if (data?.url && isDialog) {
			openDialog({
				dialogChildren: <DialogImage imageUrl={data.url} title={replace}/>
			})
		}
	}, [data?.url, replace, isDialog, openDialog])

	if (isLoading) return (<SkeletonSongImage/>);
	if (!data) return (<NullMusicImage/>);

	return (
		<Image
			onClick={handleDialog}
			src={image}
			alt={replace}
			title={replace}
			width={240}
			height={240}
			loading="lazy"
			className="w-full h-full object-cover"
		/>
	)
}