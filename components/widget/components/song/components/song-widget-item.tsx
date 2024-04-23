import { Wrapper } from "@/ui/wrapper";
import { ArtistWidget } from "@/components/artist/widget/components/artist-widget";
import { CalcHeight } from "@/lib/utils/styles/calc-height";
import { usePlayerStateQuery } from "@/lib/query/player/player-state-query";
import { SongWidget } from "@/ui/song-widget";
import { SongArtist } from "@/components/song/child/song-artist/song-artist";
import { SongImageItem } from "@/components/song/child/song-image/components/song-image";
import { SongItemTitle } from "@/components/song/child/song-title/components/song-title";
import { song_route } from "@/lib/constants/routes/routes";
import Link from "next/link";
import { SongCredits } from "@/components/song/child/song-credits/components/song-credits";
import { useSongArtistListQuery } from "@/lib/query/song/song-artist-list-query";

export const SongWidgetItem = () => {
	const { playerAttributes } = usePlayerStateQuery()
	const { height } = CalcHeight()

	const song = playerAttributes.active;
	const { data: artists } = useSongArtistListQuery(song?.id)

	if (!song || !artists) return;

	return (
		<Wrapper variant="widget" className={height}>
			<div className="flex flex-col gap-y-4 w-full pl-4 py-4 pr-1">
				<SongWidget>
					<SongArtist variant="widget_title" song={song}/>
					<Link href={`${song_route}/${song.id}`}>
						<div className="max-w-[600px] max-h-[600px] overflow-hidden">
							<SongImageItem variant="widget" song={song}/>
						</div>
					</Link>
					<div className="flex flex-col w-min">
						<SongItemTitle song={song} variant="widget"/>
						<SongArtist variant="widget" song={song}/>
					</div>
				</SongWidget>
				<ArtistWidget song={song}/>
				<SongCredits artist_list={artists.artists}/>
			</div>
		</Wrapper>
	)
}