import { Typography } from "@/ui/typography";
import { playlist_route } from "@/lib/constants/routes/routes";
import { PlaylistEntity } from "@/types/playlist";
import { PlaylistImage } from "@/components/playlist/child/playlist-image/components/playlist-image";
import Link from "next/link";

export const PlaylistLibraryCard = ({
	playlist,
	isCollapsed
}: {
	playlist: PlaylistEntity,
	isCollapsed: boolean
}) => {

	if (!playlist) return;

	return (
		<Link
			href={`${playlist_route}/${playlist.id}`}
			className="flex items-center w-full cursor-pointer bg-transparent hover:bg-neutral-800 rounded-md p-2 gap-x-4"
		>
			<PlaylistImage variant="library" playlist={playlist}/>
			{isCollapsed && (
				<div className="flex flex-col gap-y-1">
					<Typography text_color="white" size="medium" font="medium">
						{playlist.title}
					</Typography>
					<Typography size="small" text_color="gray" font="normal">
						Playlist
					</Typography>
				</div>
			)}
		</Link>
	)
}