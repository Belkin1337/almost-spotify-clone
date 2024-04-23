import { ArtistEntity } from "@/types/artist";
import { Typography } from "@/ui/typography";
import { ArtistImage } from "@/components/artist/child/artist-image/components/artist-image";
import { useWidget } from "@/lib/hooks/ui/use-widget";
import { useUserFollowedSongsByArtist } from "@/components/artist/profile/hooks/use-user-followed-songs-by-artist";
import { artist_route_liked_songs } from "@/lib/constants/routes/routes";
import Link from "next/link";

export const ArtistUserLikedSongs = ({
	artist
}: {
	artist: ArtistEntity
}) => {
	const { widgetState } = useWidget()
	const { followedSongs } = useUserFollowedSongsByArtist(artist.id)

	const isSongWidgetVisible = widgetState.data.isOpen;

	if (isSongWidgetVisible || followedSongs.length === 0) return null;

	return (
		<div className="flex flex-col gap-y-4">
			<Typography font="semibold" className="text-2xl">
				Liked Songs
			</Typography>
			<div className="flex items-center gap-4">
				<ArtistImage variant="medium" artist={artist}/>
				<Link href={artist_route_liked_songs(artist.id)} className="flex flex-col gap-2">
					<Typography text_color="white" size="large" font="semibold" variant="link">
						{/* eslint-disable-next-line react/no-unescaped-entities */}
						You've liked {followedSongs.length} songs
					</Typography>
					<Typography text_color="gray" size="small">
						By {artist.name}
					</Typography>
				</Link>
			</div>
		</div>
	)
}