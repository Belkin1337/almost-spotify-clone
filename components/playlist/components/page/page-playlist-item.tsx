"use client"

import { ColoredBackground } from "@/ui/colored-background";
import { usePlaylistQuery } from "@/lib/query/playlist/playlist-query";
import { useLoadImage } from "@/lib/hooks/image/use-load-image";
import { nullAvatarImage } from "@/lib/constants/files/invalid-or-null-images";
import { PlaylistItemPagePreviewImage } from "@/components/playlist/components/page/playlist-item-page-preview-image";
import { PlaylistItemPagePreview } from "@/components/playlist/components/page/playlist-item-page-preview";
import { Wrapper } from "@/ui/wrapper";
import { useEffect, useState } from "react";
import { usePlaylistSongsQuery } from "@/lib/query/playlist/playlist-songs-query";
import { SongListTableHead } from "@/ui/song-list-table-head";
import { useUserQuery } from "@/lib/query/user/user-query";
import {
	PlaylistItemPageRecommendationSongs
} from "@/components/playlist/components/page/playlist-item-page-recommendation-songs";
import dynamic from "next/dynamic";

const SongItem = dynamic(() => import("@/components/song/song-item/song-item")
	.then(mod => mod.SongItem));

const PlaylistToolsBar = dynamic(() => import("@/components/playlist/child/playlist-tools-bar/playlist-tools-bar")
	.then(mod => mod.PlaylistToolsBar));

export const PagePlaylistItem = ({
	playlistId
}: {
	playlistId: string
}) => {
	const [currentUserPlaylist, setCurrentUserPlaylist] = useState(false);
	const { data: user } = useUserQuery();
	const { data: playlist, isError } = usePlaylistQuery(playlistId);
	const { data: cover, } = useLoadImage(playlist?.image_path!);
	const { data: playlistSongs } = usePlaylistSongsQuery(playlistId);

	useEffect(() => {
		if (playlist?.user_id === user?.id) setCurrentUserPlaylist(true)
	}, [playlist?.user_id, user?.id]);

	if (!playlist || isError) return;

	return (
		<Wrapper variant="page">
			<ColoredBackground imageUrl={cover?.url || nullAvatarImage}/>
			<div className="flex flex-col relative">
				<div className="flex justify-start h-full items-end z-20 p-6 gap-x-6 relative">
					<PlaylistItemPagePreviewImage
						currentUserPlaylist={currentUserPlaylist}
						playlist={playlist}
					/>
					<PlaylistItemPagePreview
						playlist={playlist}
						playlistSongsLength={playlistSongs?.length || 0}
					/>
				</div>
				<div className="flex flex-col bg-black/20 backdrop-filter backdrop-blur-md min-h-screen">
					{playlistSongs && (
						<PlaylistToolsBar
							currentUserPlaylist={currentUserPlaylist}
							playlist={playlist}
							playlistSongs={playlistSongs}
						/>
					)}
					{playlistSongs?.length! >= 1 && (
						<>
							<SongListTableHead/>
							<div className="flex flex-col gap-y-1 p-6 relative">
								{playlistSongs?.map((song,
									idx) => (
									<SongItem
										key={song.id}
										song={song}
										song_list={{ id: String(idx + 1), data: playlistSongs }}
									/>
								))}
							</div>
						</>
					)}
					{currentUserPlaylist && (
						<PlaylistItemPageRecommendationSongs
							playlist={playlist}
							playlistSongs={playlistSongs || []}
						/>
					)}
				</div>
			</div>
		</Wrapper>
	)
}