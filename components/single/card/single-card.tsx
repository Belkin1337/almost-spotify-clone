import { AlbumImageItem, AlbumItem } from "@/ui/album";
import Image from "next/image";
import { nullAvatarImage } from "@/lib/constants/files/invalid-or-null-images";
import { Typography } from "@/ui/typography";
import { FaCircle } from "react-icons/fa";
import { useLoadImage } from "@/lib/hooks/image/use-load-image";
import { song_route } from "@/lib/constants/routes/routes";
import { SongEntity } from "@/types/song";
import Link from "next/link";

export const SingleCard = ({
	song
}: {
	song: SongEntity
}) => {
	const { data: image } = useLoadImage(song.image_path);

	if (!song) return;

	return (
		<Link href={song_route(song?.id)}>
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
						{song.title}
					</Typography>
				</div>
				<div className="flex gap-2 items-center w-full">
					<Typography size="small" text_color="gray" className="truncate">
						2024
					</Typography>
					<FaCircle size={5} className="fill-neutral-400"/>
					<Typography size="small" text_color="gray">
						Single
					</Typography>
				</div>
			</AlbumItem>
		</Link>
	)
}