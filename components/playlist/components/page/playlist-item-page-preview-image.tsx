import { useLoadImage } from "@/lib/hooks/image/use-load-image";
import Image from "next/image";
import { SkeletonPlaylistImage } from "@/components/skeletons/playlist/skeleton-playlist-image/skeleton-playlist-image";
import { FaPen } from "react-icons/fa";
import { Typography } from "@/ui/typography";
import { PlaylistEditForm } from "@/components/forms/playlist/components/edit-playlist-form";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { PlaylistItemProps } from "@/components/playlist/types/playlist-types";

type PlaylistItemPagePreviewImageProps = PlaylistItemProps & {
	currentUserPlaylist: boolean
}

export const PlaylistItemPagePreviewImage = ({
	playlist, currentUserPlaylist
}: PlaylistItemPagePreviewImageProps) => {
	const { data: image, isLoading } = useLoadImage(playlist.image_path)
	const { openDialog } = useDialog();

	if (isLoading || !image?.url) return <SkeletonPlaylistImage/>
	
	return (
		<div className="flex relative group overflow-hidden h-[224px] w-[224px] rounded-md">
			<Image
				src={image?.url || "/images/liked.png"}
				width={660}
				height={660}
				loading="lazy"
				alt={playlist.title}
				className="min-w-[224px] object-cover max-w-[224px] max-h-[224px] min-h-[224px]"
			/>
			{currentUserPlaylist && (
				<div
					onClick={() => openDialog({
						dialogChildren: <PlaylistEditForm playlist={playlist}/>
					})}
					className="group-hover:flex flex-col gap-y-4 cursor-pointer items-center justify-center hidden w-full
					 top-0 bg-black/60 right-0 left-0 bottom-0 absolute h-full"
				>
					<FaPen size={46}/>
					<Typography font="semibold">
						Выбрать фото
					</Typography>
				</div>
			)}
		</div>
	)
}