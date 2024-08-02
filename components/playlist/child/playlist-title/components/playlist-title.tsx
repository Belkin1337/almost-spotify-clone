import {
	IPlaylistTitle,
	playlistTitleVariants
} from "@/components/playlist/child/playlist-title/types/playlist-title-types";

export const PlaylistTitle = ({
	playlist, variant, className, ...props
}: IPlaylistTitle) => {
	return (
		<p className={playlistTitleVariants(({ variant, className }))} {...props}>
			{playlist?.title}
		</p>
	)
}