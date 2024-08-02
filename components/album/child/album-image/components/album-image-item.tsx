import { useLoadImage } from "@/lib/hooks/image/use-load-image";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { DialogImage } from "@/ui/dialog-image";
import { ImageCover } from "@/ui/image-cover";
import { ImageWrapper } from "@/ui/image-wrapper";
import { AlbumItemProps } from "@/components/album/types/album-types";

export const AlbumImageItem = ({
	album
}: AlbumItemProps) => {
	const { openDialog } = useDialog()
	const { data: image } = useLoadImage(album?.image_url!);
	
	const handleDialog = () => {
		if (image?.url) {
			openDialog({
				dialogChildren: (
					<DialogImage imageUrl={image.url} title={album.title}/>
				)
			})
		}
	}
	
	return (
		<ImageWrapper onClick={handleDialog}>
			<ImageCover path={image?.url} title={album.title}/>
		</ImageWrapper>
	)
}