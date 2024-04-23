"use client"

import { ColoredBackground } from "@/ui/colored-background";
import { usePlaylistQuery } from "@/lib/query/playlist/playlist-query";
import { useLoadImage } from "@/lib/hooks/image/use-load-image";
import { nullAvatarImage } from "@/lib/constants/files/invalid-or-null-images";
import { PlaylistImageItem } from "@/components/playlist/child/playlist-image-item";
import { PlaylistItemPagePreview } from "@/components/playlist/child/playlist-item-page-preview";
import { PlaylistToolsBar } from "@/components/playlist/child/playlist-tools-bar/playlist-tools-bar";
import { Typography } from "@/ui/typography";
import { Input } from "@/ui/input";
import { Wrapper } from "@/ui/wrapper";
import { useEffect, useState } from "react";
import { CloseButton } from "@/ui/close-button";
import { X } from "lucide-react";
import { useSongsAllQuery } from "@/lib/query/song/songs-all-query";
import { CollectionsSongItem } from "@/components/song/components/collections/collections-song-item";
import { usePlaylistSongsQuery } from "@/lib/query/playlist/playlist-songs-query";
import { SongItem } from "@/components/song/song-item/song-item";

export const PagePlaylistItem = ({
	playlistId
}: {
	playlistId: string
}) => {
	const [count, setCount] = useState<number>(10);
	const [isSearchSongsVisible, setIsSearchSongsVisible] = useState(true);
	const { data: playlist, isError } = usePlaylistQuery(playlistId);
	const { data: cover, } = useLoadImage(playlist?.image_path!);
	const { data: recommendedSongs, refetch } = useSongsAllQuery(count);
	const { data: songs } = usePlaylistSongsQuery(playlistId);

	useEffect(() => {
		setCount((prev) => prev + 1);

		refetch();
	}, [refetch, songs]);

	const recommendedSongsFiltered = recommendedSongs?.filter(item => !songs?.some(song => song.id === item.id)).slice(0, 10);

	if (!playlist || isError) return;

	return (
		<Wrapper variant="page">
			<ColoredBackground imageUrl={cover?.url || nullAvatarImage}/>
			<div className="flex flex-col relative">
				<div className="flex justify-start h-full items-end z-20 p-6 gap-x-6">
					<PlaylistImageItem playlist={playlist}/>
					<PlaylistItemPagePreview playlist={playlist}/>
				</div>
				<div className="flex flex-col bg-black/20 backdrop-filter backdrop-blur-md min-h-screen">
					<PlaylistToolsBar playlist={playlist}/>
					{songs?.length! >= 1 && (
						<div className="flex flex-col gap-y-4 p-6 relative">
							{songs?.map((song,
								idx) => (
								<SongItem
									key={song.id}
									song={song}
									song_list={{ id: String(idx + 1), data: songs }}
								/>
							))}
						</div>
					)}
					<div className="flex flex-col gap-y-4 p-6 relative">
						{isSearchSongsVisible ? (
							<>
								<CloseButton onClick={() => setIsSearchSongsVisible(!isSearchSongsVisible)}>
									<X className="h-5 w-5"/>
								</CloseButton>
								<Typography className="text-2xl" font="semibold">
									{/* eslint-disable-next-line react/no-unescaped-entities */}
									Let's find something for your playlist
								</Typography>
								<Input placeholder="Search for songs and or episodes"/>
							</>
						) : (
							<Typography
								className="self-end" size="xl" font="semibold"
								onClick={() => setIsSearchSongsVisible(!isSearchSongsVisible)}
							>
								Find more
							</Typography>
						)}
					</div>
					{!isSearchSongsVisible && (
						<div className="flex flex-col w-full gap-y-4 p-6 mt-12 relative">
							<Typography className="text-2xl" font="semibold">
								Recommended
							</Typography>
							{recommendedSongsFiltered?.map((song,
								idx) => (
								<CollectionsSongItem
									playlist={playlist}
									key={song.id}
									song={song}
								/>
							))}
						</div>
					)}
				</div>
			</div>
		</Wrapper>
	)
}