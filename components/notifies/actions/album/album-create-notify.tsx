import { album_route } from "@/lib/constants/routes/routes";
import { Typography } from "@/ui/typography";
import Link from "next/link"
import { AlbumItemProps } from "@/components/album/types/album-types";

export const AlbumCreateNotify = ({
	album
}: AlbumItemProps) => {
	return (
		<Link href={album_route(album.id)}>
			<Typography className="underline" text_color="black" font="bold">
				Перейти к альбому
			</Typography>
		</Link>
	)
}