import { useScopedI18n } from "@/locales/client"
import { Typography } from "@/ui/typography"
import Image from "next/image"
import { followed_songs } from "@/lib/constants/routes/routes";
import Link from "next/link";

export const FollowTrackRouteButton = ({
	isCollapsed
}: {
	isCollapsed: boolean
}) => {
	const likedSongButtonLocale = useScopedI18n('main-service.main-part.config')

	return (
		<Link href={followed_songs} className="flex flex-col p-2 md:flex-row items-center gap-x-4 cursor-pointer hover:bg-neutral-800/50 rounded-md">
			<Image
				src="/images/liked.png"
				width={48}
				height={48}
				loading="lazy"
				alt="Liked Songs"
				title="Liked Songs"
				className="relative rounded-md min-h-[48px] min-w-[48px] max-h-[48px] max-w-[48px] object-cover"
			/>
			{isCollapsed && (
				<div className="flex flex-col mt-4 md:mt-0">
					<Typography size="medium">
						{likedSongButtonLocale('liked-tracks-widget')}
					</Typography>
					<Typography text_color="gray" font="medium">
						{likedSongButtonLocale('song-attributes.song-playlist')}
					</Typography>
				</div>
			)}
		</Link>
	)
}