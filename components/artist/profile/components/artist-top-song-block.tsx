import { Typography } from "@/ui/typography"
import { useArtistSongListQuery } from "@/lib/query/artist/artists-songs-list-query";
import { ArtistTopSongBlockType } from "@/components/artist/profile/types/artist-top-song-block-types";
import { ArtistTopSongItem } from "@/components/song/components/artist/artist-top-song-item";
import { useState } from "react";

export const ArtistTopSongBlock = ({
	artistId
}: ArtistTopSongBlockType) => {
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	const { data: songs, isError, isLoading, isPending } = useArtistSongListQuery(
		artistId,
		10
	)

	const artistsSongsLength = songs?.length!;
	const songsCount = isExpanded ? 10 : 5;

	if (isError || isLoading) return;

	return (
		<div className="flex flex-col items-start w-full">
			<Typography className="text-2xl" font="semibold">
				Popular
			</Typography>
			<div className="flex flex-col gap-y-2 min-w-[620px] py-2">
				{songs && (
					<div className="flex flex-col items-start w-full rounded-md">
						{songs?.slice(0, songsCount).map((song,
							idx) => (
							<ArtistTopSongItem
								variant="artist_library"
								key={song.id}
								type="page"
								song={song}
								isLoading={isLoading}
								song_list={{
									id: String(idx + 1),
									data: songs
								}}
							/>
						))}
					</div>
				)}
				{artistsSongsLength > 5 && (
					isExpanded ? (
						<Typography
							font="semibold"
							text_color="gray"
							onClick={() => setIsExpanded(!isExpanded)}
							className="hover:brightness-125 cursor-pointer"
						>
							Show less
						</Typography>
					) : (
						<Typography
							font="semibold"
							text_color="gray"
							onClick={() => setIsExpanded(!isExpanded)}
							className="hover:brightness-125 cursor-pointer"
						>
							See more
						</Typography>
					)
				)}
			</div>
		</div>
	)
}