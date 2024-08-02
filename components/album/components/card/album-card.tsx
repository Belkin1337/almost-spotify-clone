import { AlbumImageItem, AlbumItem } from "@/ui/album";
import Image from "next/image";
import { nullAvatarImage } from "@/lib/constants/files/invalid-or-null-images";
import { Typography } from "@/ui/typography";
import { FaCircle } from "react-icons/fa";
import { useLoadImage } from "@/lib/hooks/image/use-load-image";
import { album_route } from "@/lib/constants/routes/routes";
import Link from "next/link";
import { AlbumItemProps } from "@/components/album/types/album-types";

export const AlbumCard = ({
	album
}: AlbumItemProps) => {
	const { data: image } = useLoadImage(album.image_url!);

	if (!album) return;

	return (
		<Link href={album_route(album.id)}>
			<AlbumItem>
				<AlbumImageItem>
					<Image
						src={image?.url || nullAvatarImage}
						alt="Album"
						width={400}
						height={400}
						className="w-full h-full object-cover"
						loading="lazy"
					/>
				</AlbumImageItem>
				<div className="flex items-center w-full">
					<Typography size="large">
						{album.title}
					</Typography>
				</div>
				<div className="flex gap-2 items-center w-full">
					<Typography size="small" text_color="gray" className="truncate">
						2024
					</Typography>
					<FaCircle size={5} className="fill-neutral-400"/>
					<Typography size="small" text_color="gray">
						Album
					</Typography>
				</div>
			</AlbumItem>
		</Link>
	)
}