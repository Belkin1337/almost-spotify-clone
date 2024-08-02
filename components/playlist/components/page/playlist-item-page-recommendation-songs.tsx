import { CloseButton } from "@/ui/close-button";
import { X } from "lucide-react";
import { Typography } from "@/ui/typography";
import { Input } from "@/ui/input";
import { CollectionsSongItem } from "@/components/song/components/collections/collections-song-item";
import { useEffect, useMemo, useState } from "react";
import { useSongsAllQuery } from "@/lib/query/song/songs-all-query";
import { SongEntity } from "@/types/song";
import { PlaylistItemProps } from "@/components/playlist/types/playlist-types";

type PlaylistItemPageRecommendationSongsProps = PlaylistItemProps & {
	playlistSongs: SongEntity[]
}

export const PlaylistItemPageRecommendationSongs = ({
	playlist, playlistSongs
}: PlaylistItemPageRecommendationSongsProps) => {
	const [count, setCount] = useState<number>(10);
	const [isSearchSongsVisible, setIsSearchSongsVisible] = useState(true);
	const { data: recommendedSongs, refetch } = useSongsAllQuery(count);

	useEffect(() => {
		setCount((prev) => prev + 1);

		refetch();
	}, [refetch, playlistSongs]);

	const recommendedSongsFiltered = useMemo(() => {
		return recommendedSongs?.
			filter(item => !playlistSongs?.
			some(song => song.id === item.id)).
			slice(0, 10);
	}, [playlistSongs, recommendedSongs])

	return (
		<>
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
						className="self-end"
						size="large"
						font="bold"
						onClick={() => setIsSearchSongsVisible(!isSearchSongsVisible)}
					>
						Find more
					</Typography>
				)}
			</div>
			{!isSearchSongsVisible && (
				<div className="flex flex-col w-full gap-y-6 p-6 mt-12 relative">
					<div className="flex flex-col gap-y-1">
						<Typography className="text-xl" font="bold">
							Recommended
						</Typography>
						<Typography text_color="gray" size="small" font="normal">
							{/* eslint-disable-next-line react/no-unescaped-entities */}
							Based on what's in this playlist
						</Typography>
					</div>
					<div className="flex flex-col gap-y-1">
						{recommendedSongsFiltered?.map((song,
							idx) => (
							<CollectionsSongItem
								playlist={playlist}
								key={song.id}
								song={song}
							/>
						))}
					</div>
				</div>
			)}
		</>
	)
}