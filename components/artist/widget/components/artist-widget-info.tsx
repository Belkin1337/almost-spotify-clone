import { ArtistEntity } from "@/types/artist"
import { ArtistDescription } from "../../child/artist-description/components/artist-description"
import { ArtistImage } from "../../child/artist-image/components/artist-image"
import { Typography } from "@/ui/typography";
import Image from "next/image";
import { nullAvatarImage } from "@/lib/constants/files/invalid-or-null-images";

export const ArtistWidgetInfo = ({
	artist
}: {
	artist: ArtistEntity
}) => {
	return (
		<div className="flex flex-col w-[840px]">
			<ArtistImage artist={artist}/>
			<div className="flex items-start w-full py-6 px-12 gap-x-6 overflow-hidden">
				<div className="flex flex-col w-1/3 gap-y-6">
					<div className="flex flex-col items-start">
						<Typography className="text-3xl" text_color="white" font="bold">
							{artist?.followers}
						</Typography>
						<Typography size="small" text_color="gray" font="normal">
							Followers
						</Typography>
					</div>
					<div className="flex flex-col items-start">
						<Typography className="text-3xl" text_color="white" font="bold">
							{artist?.listeners}
						</Typography>
						<Typography size="small" text_color="gray" font="normal">
							Monthly Listeners
						</Typography>
					</div>
				</div>
				<div className="flex flex-col w-fit gap-y-6">
					<ArtistDescription artist={artist} variant="dialog"/>
					<div className="flex items-center gap-2">
						<Image
							src={nullAvatarImage}
							alt={`Posted by ${artist.name}`}
							title={`Posted by ${artist.name}`}
							width={38}
							height={38}
							className="rounded-full object-cover"
						/>
						<Typography text_color="gray">
							Posted By {artist.name}
						</Typography>
					</div>
				</div>
			</div>
		</div>
	)
}