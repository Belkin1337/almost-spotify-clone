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
import { USER_QUERY_KEY } from "@/lib/query/user/user-query";
import {
	PlaylistItemPageRecommendationSongs
} from "@/components/playlist/components/page/playlist-item-page-recommendation-songs";
import dynamic from "next/dynamic";
import { SongItem } from "@/components/song/song-item/song-item";
import { PlaylistItemProps } from "@/components/playlist/types/playlist-types";
import { UserEntity } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query"

const PlaylistToolsBar = dynamic(() =>
	import("@/components/playlist/child/playlist-tools-bar/playlist-tools-bar")
	.then(mod => mod.PlaylistToolsBar)
);

type PagePlaylistItemProps = Pick<Pick<PlaylistItemProps, "playlist">["playlist"], "id">

export const PagePlaylistItem = ({
	id: playlistId
}: PagePlaylistItemProps) => {
	const qc = useQueryClient()
	const user = qc.getQueryData<UserEntity>(USER_QUERY_KEY)
	if (!user) return null;
	
	const [currentUserPlaylist, setCurrentUserPlaylist] = useState<boolean | undefined>(undefined);
	
	const { data: playlist, isError } = usePlaylistQuery(playlistId);
	const { data: cover, } = useLoadImage(playlist?.image_path!);
	const { data: playlistSongs, isLoading: loadingPlaylistSongs } = usePlaylistSongsQuery(playlistId);

	const playlistSongsLength = playlistSongs?.length || 0;

	useEffect(() => {
		if (playlist?.user_id === user?.id) setCurrentUserPlaylist(true)
	}, [playlist?.user_id, user?.id]);

	if (!playlist || isError || loadingPlaylistSongs || !currentUserPlaylist) return;

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
						playlistSongsLength={playlistSongsLength}
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
					{playlistSongsLength >= 1 && (
						<div className="flex flex-col p-6">
							<SongListTableHead/>
							<div className="flex flex-col gap-y-1 relative">
								{playlistSongs?.map((song,
									idx) => (
									<SongItem
										key={song.id}
										playlist={playlist}
										song={song}
										song_list={{ id: String(idx + 1), data: playlistSongs }}
									/>
								))}
							</div>
							{playlistSongsLength > 3 && <hr className="border border-neutral-700 w-full mt-4 h-[1px]"/>}
						</div>
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