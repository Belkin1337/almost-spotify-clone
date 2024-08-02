import { Typography } from "@/ui/typography";
import { PlaylistTitle } from "@/components/playlist/child/playlist-title/components/playlist-title";
import { PlaylistCreator } from "@/components/playlist/child/playlist-creator/components/playlist-creator";
import { PlaylistInfo, PlaylistInfoType } from "@/components/playlist/child/playlist-info/components/playlist-info";
import { PlaylistItemProps } from "@/components/playlist/types/playlist-types";

type PlaylistItemPagePreviewType = Pick<PlaylistInfoType, 'playlistSongsLength'>

interface IPlaylistItemPagePreview extends PlaylistItemPagePreviewType, PlaylistItemProps {}

export const PlaylistItemPagePreview = ({
	playlist, playlistSongsLength
}: IPlaylistItemPagePreview) => {

	if (!playlist) return;

	return (
		<div className="flex flex-col gap-y-2 self-end">
			<Typography size="small" font="normal">
				{/*{playlist.attributes.is_public ? 'Public Playlist' : 'Private Playlist'} */}
				Playlist
			</Typography>
			<PlaylistTitle variant="page" playlist={playlist} />
			<div className="flex items-center gap-x-2">
				<PlaylistCreator playlist={playlist}/>
				<PlaylistInfo playlistSongsLength={playlistSongsLength}/>
			</div>
		</div>
	)
}