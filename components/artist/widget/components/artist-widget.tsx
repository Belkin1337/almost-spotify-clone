import { SongEntity } from "@/types/song"
import { Typography } from "@/ui/typography"
import { useLoadImage } from "@/lib/hooks/image/use-load-image"
import { ArtistName } from "../../child/artist-name/components/artist-name"
import { ArtistDescription } from "../../child/artist-description/components/artist-description"
import { useDialog } from "@/lib/hooks/ui/use-dialog"
import { useCallback } from "react"
import { ArtistWidgetInfo } from "./artist-widget-info"
import { useSongArtistListQuery } from "@/lib/query/song/song-artist-list-query";
import { ArtistFollowButton } from "@/components/artist/child/artist-follow-button/components/artist-follow-button";
import { ArtistWidgetSongImage } from "@/components/artist/widget/components/artist-widget-song-image";

export const ArtistWidget = ({
	song
}: {
	song: SongEntity
}) => {
	const { openDialog } = useDialog();

	const { data: artist, isError } = useSongArtistListQuery(song.id)
	const { data: image } = useLoadImage(artist?.firstArtist?.avatar_path!)

	const handleArtistInfo = useCallback(() => {
		if (artist) openDialog({
			dialogChildren: <ArtistWidgetInfo artist={artist.firstArtist}/>
		})
	}, [artist, openDialog])

	if (isError || !artist) return;

	return (
		<div
			onClick={handleArtistInfo}
			className="flex flex-col w-full rounded-lg cursor-pointer bg-neutral-800 overflow-hidden"
		>
			<div className="flex flex-col relative h-[240px] w-full p-4">
				<ArtistWidgetSongImage
					artist={artist.firstArtist}
					imageUrl={image?.url as string}
				/>
				<div className="flex flex-col items-start relative">
					<Typography text_color="white" font="bold" size="large">
						Об исполнителе
					</Typography>
				</div>
			</div>
			<div className="flex flex-col items-start gap-y-2 max-h-[180px] w-full p-4 overflow-hidden">
				<ArtistName artist={artist.firstArtist} type="link"/>
				<div className="flex items-center justify-between w-full">
					<div className="flex items-center gap-x-1">
						<Typography size="large" text_color="gray" font="medium">
							{artist?.firstArtist?.listeners}
						</Typography>
						<Typography size="small" text_color="gray" font="medium">
							monthly listeners
						</Typography>
					</div>
					<ArtistFollowButton artistId={artist.firstArtist.id}/>
				</div>
				<ArtistDescription artist={artist.firstArtist} variant="widget"/>
			</div>
		</div>
	)
}