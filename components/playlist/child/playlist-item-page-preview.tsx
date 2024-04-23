import { PlaylistEntity } from "@/types/playlist";
import { Typography } from "@/ui/typography";
import { PlaylistTitle } from "@/components/playlist/child/playlist-title/components/playlist-title";
import { Timestamp } from "@/ui/timestamp";
import { useUserByIdQuery } from "@/lib/query/user/user-id-query";

export const PlaylistItemPagePreview = ({
	playlist
}: {
	playlist: PlaylistEntity
}) => {
	const { data: userById } = useUserByIdQuery(playlist.user_id!)

	if (!playlist) return;

	return (
		<div className="flex flex-col gap-y-2 self-end">
			<Typography size="small" font="normal">
				{playlist.attributes.is_public ? 'Public Playlist' : 'Private Playlist'}
			</Typography>
			<PlaylistTitle variant="page" playlist={playlist} />
			<div className="flex items-center gap-x-2">
				<Typography>
					{userById?.full_name}
				</Typography>
				<Timestamp date={playlist.created_at!} />
			</div>
		</div>
	)
}