import { Typography } from "@/ui/typography";
import { playlist_route } from "@/lib/constants/routes/routes";
import { PlaylistImage } from "@/components/playlist/child/playlist-image/components/playlist-image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { PlaylistItemProps } from "@/components/playlist/types/playlist-types";

type PlaylistLibraryCardProps = PlaylistItemProps & {
	isExpanded: boolean
}

export const PlaylistLibraryCard = ({
	playlist,
	isExpanded
}: PlaylistLibraryCardProps) => {
	const { push } = useRouter();

	const handlePushToPlaylist = useCallback(() => {
		push(playlist_route(playlist.id))
	}, [push, playlist.id])

	if (!playlist) return;

	return (
		<div
			onClick={handlePushToPlaylist}
			className="flex items-center w-full cursor-pointer bg-transparent hover:bg-neutral-800 rounded-md p-2 gap-x-4"
		>
			<PlaylistImage variant="library" playlist={playlist}/>
			{isExpanded && (
				<div className="flex flex-col gap-y-1">
					<Typography text_color="white" size="medium" font="medium">
						{playlist.title}
					</Typography>
					<Typography size="small" text_color="gray" font="normal">
						Playlist
					</Typography>
				</div>
			)}
		</div>
	)
}