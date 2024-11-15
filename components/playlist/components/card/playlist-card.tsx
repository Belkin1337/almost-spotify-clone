import { AlbumImageItem, AlbumItem } from "@/ui/album";
import Image from "next/image";
import { nullAvatarImage } from "@/lib/constants/files/invalid-or-null-images";
import { Typography } from "@/ui/typography";
import { FaCircle } from "react-icons/fa";
import { useLoadImage } from "@/lib/hooks/image/use-load-image";
import { playlist_route } from "@/lib/constants/routes/routes";
import { useRouter } from "next/navigation";
import { PlaylistItemProps } from "@/components/playlist/types/playlist-types";

export const PlaylistCard = ({
	playlist
}: PlaylistItemProps) => {
	const { push } = useRouter()
	const { data: image } = useLoadImage(playlist.image_path!);

	const targetToPlaylist = (id: string) => push(playlist_route(id))

	return (
		<AlbumItem onClick={() => targetToPlaylist(playlist.id)}>
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
					{playlist.title}
				</Typography>
			</div>
			<div className="flex gap-2 items-center w-full">
				<Typography size="small" text_color="gray" className="truncate">
					2024
				</Typography>
				<FaCircle size={5} className="fill-neutral-400"/>
				<Typography size="small" text_color="gray">
					Playlist
				</Typography>
			</div>
		</AlbumItem>
	)
}