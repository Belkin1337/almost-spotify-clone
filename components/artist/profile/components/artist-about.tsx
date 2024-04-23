import { ArtistEntity } from "@/types/artist";
import { useLoadImage } from "@/lib/hooks/image/use-load-image";
import { Typography } from "@/ui/typography";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { useCallback } from "react";
import { ArtistWidgetInfo } from "@/components/artist/widget/components/artist-widget-info";
import { ArtistAboutItem } from "@/ui/artist-about-item";
import { Overlay } from "@/ui/overlay";

export const ArtistAbout = ({
	artist
}: {
	artist: ArtistEntity
}) => {
	const { openDialog } = useDialog();

	const handleArtistInfo = useCallback(() => {
		if (artist) {
			openDialog({
				dialogChildren: <ArtistWidgetInfo artist={artist}/>
			})
		}
	}, [artist, openDialog])

	const { data: image } = useLoadImage(artist?.avatar_path!)

	return (
		<div className="flex flex-col items-start w-full px-6">
			<Typography font="bold" className="text-2xl mb-4">
				About
			</Typography>
			<div className="flex flex-wrap items-start w-full">
				<ArtistAboutItem
					style={{ backgroundImage: `url(${image?.url})` }}
					onClick={handleArtistInfo}
				>
					<Overlay variant="black"/>
					<div className="flex flex-col gap-y-4 relative">
						<Typography text_color="white" size="medium" font="semibold">
							{artist?.listeners} monthly listeners
						</Typography>
						<Typography text_color="white" size="medium" font="semibold">
							{artist?.description?.slice(0, 192)}
						</Typography>
					</div>
				</ArtistAboutItem>
			</div>
		</div>
	)
}