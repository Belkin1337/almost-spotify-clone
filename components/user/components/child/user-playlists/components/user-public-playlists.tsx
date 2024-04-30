"use client"

import { Typography } from "@/ui/typography";
import { usePlaylistsListByUser } from "@/lib/query/playlist/playlists-by-user-query";
import { PlaylistCard } from "@/components/playlist/components/card/playlist-card";

export const UserPublicPlaylists = ({
	userId
}: {
	userId: string
}) => {
	const { data: userPlaylists, isLoading } = usePlaylistsListByUser(userId);

	if (userPlaylists?.length === 0) return;

	return (
		<div className="flex relative flex-col gap-y-4">
			<div className="flex flex-col">
				<Typography text_color="white" font="semibold" className="text-2xl">
					Открытые плейлисты
				</Typography>
			</div>
			<div className="flex flex-row items-center overflow-hidden gap-4 w-fit">
				{userPlaylists?.map(playlist => (
					<PlaylistCard playlist={playlist} key={playlist.id}/>
				))}
			</div>
		</div>
	)
}