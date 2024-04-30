"use client"

import { useLoadImage } from "@/lib/hooks/image/use-load-image";
import { SongListTableHead } from "@/ui/song-list-table-head";
import { Typography } from "@/ui/typography";
import { ColoredBackground } from "@/ui/colored-background";
import { SongImageItem } from "@/components/song/child/song-image/components/song-image";
import { PageSongPreview } from "@/components/song/components/page/components/page-song-preview";
import { SongToolsBar } from "@/components/song/child/song-tools-bar/components/song-tools-bar";
import { SongItem } from "@/components/song/song-item/song-item";
import { useSingleSongsQuery } from "@/lib/query/single/single-songs-query";
import { useSingleQuery } from "@/lib/query/single/single-query";
import { useSingleArtistsQuery } from "@/lib/query/single/single-artists-query";
import dynamic from "next/dynamic";

const PageSongMore = dynamic(() => import("@/components/song/components/page/components/page-song-more")
	.then(mod => mod.PageSongMore));

export const SingleItemPage = ({
	singleId
}: {
	singleId: string
}) => {
	const { data: single } = useSingleQuery(singleId);
	const { data: artists } = useSingleArtistsQuery(singleId);
	const { data: songs, isError, isLoading } = useSingleSongsQuery(singleId);
	const { data: image } = useLoadImage(single?.image_url!)

	if (!songs || !artists || isError) return;

	return (
		<>
			<ColoredBackground imageUrl={image?.url!} />
			<div className="flex flex-col relative">
				<div className="z-20 p-6 flex gap-x-6 justify-start h-full items-end">
					<SongImageItem variant="page" song={songs[0]}/>
					<PageSongPreview type="single" song={songs[0]} />
				</div>
				<div className="flex flex-col bg-black/20 backdrop-filter backdrop-blur-md">
					<SongToolsBar song={songs[0]} />
					<SongListTableHead />
					<div className="p-6">
						{songs?.map((song, idx) => (
							<SongItem
								key={song.id}
								type="page"
								song={song}
								queryOptions={{ isLoading: isLoading }}
								song_list={{
									id: String(idx + 1),
									data: songs
								}}
							/>
						))}
					</div>
					<div className="flex flex-col max-w-[340px] overflow-hidden py-6 px-8">
						<Typography size="small" text_color="gray">
							March 16, 2024
						</Typography>
						<Typography className="text-[12px]" text_color="gray">
							@ {new Date().getFullYear()}
						</Typography>
					</div>
					<PageSongMore artist={artists[0]} songId={songs[0].id}/>
				</div>
			</div>
		</>
	)
}