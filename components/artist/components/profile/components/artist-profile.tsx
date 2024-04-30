"use client"

import { ColoredBackground } from "@/ui/colored-background"
import { ArtistVerifyButton } from "../../../child/artist-verify/components/artist-verify-button"
import { ArtistTopSongBlock } from "./artist-top-song-block"
import { useLoadImage } from "@/lib/hooks/image/use-load-image"
import { ArtistListeners } from "@/components/artist/child/artist-listeners/components/artist-listeners"
import { ArtistName } from "../../../child/artist-name/components/artist-name"
import { ArtistUserLikedSongs } from "@/components/artist/components/profile/components/artist-user-liked-songs";
import { useArtistQuery } from "@/lib/query/artist/artist-query";
import { ArtistToolsBar } from "@/components/artist/child/artist-tools-bar/components/artist-tools-bar";
import { ArtistDiscography } from "@/components/artist/components/profile/components/artist-discography";
import { ArtistAbout } from "@/components/artist/components/profile/components/artist-about";
import { Overlay } from "@/ui/overlay";
import { nullAvatarImage } from "@/lib/constants/files/invalid-or-null-images";
import { Typography } from "@/ui/typography";
import { ArtistImage } from "@/components/artist/child/artist-image/components/artist-image";

export const ArtistProfile = ({
	artistId
}: {
	artistId: string
}) => {
	const { data: artist, isError, isPending } = useArtistQuery(artistId);
	const { data: avatarUrl, isLoading: coverUrlLoading } = useLoadImage(artist?.cover_image_path!);

	if (!artist || isError || coverUrlLoading) return;

	return (
		<>
			<ColoredBackground imageUrl={avatarUrl?.url || nullAvatarImage}/>
			{avatarUrl ? (
				<div className="-top-[84px] relative overflow-hidden h-[412px] p-6 bg-no-repeat bg-cover z-20 bg-center"
						 style={{ backgroundImage: `url(${avatarUrl?.url})` }}>
					<Overlay variant="black"/>
					<div className="relative gap-y-2 z-20 flex flex-col justify-end h-full items-start">
						<ArtistVerifyButton/>
						<ArtistName artist={artist} variant="page"/>
						<div className="flex items-center gap-x-1">
							<ArtistListeners artist={artist} variant="page"/>
							<Typography text_color="white" size="small" font="medium">
								monthly listeners
							</Typography>
						</div>
					</div>
				</div>
			) : (
				<div className="relative overflow-hidden h-[404px] p-6 z-20">
					<div className="flex items-center gap-x-6">
						<ArtistImage artist={artist} variant="profile"/>
						<div className="relative gap-y-2 z-20 flex flex-col justify-end h-full items-start">
							<ArtistVerifyButton/>
							<ArtistName artist={artist} variant="page"/>
							<div className="flex items-center gap-x-1">
								<ArtistListeners artist={artist} variant="page"/>
								<Typography text_color="white" size="small" font="medium">
									monthly listeners
								</Typography>
							</div>
						</div>
					</div>
				</div>
			)}
			<div className="flex flex-col w-full py-6 gap-y-4 relative z-30">
				<div className="flex items-start w-full">
					<div className="flex flex-col gap-y-8 px-6 w-2/3 relative -top-[76px]">
						<ArtistToolsBar artistId={artistId}/>
						<ArtistTopSongBlock artistId={artistId}/>
					</div>
					<ArtistUserLikedSongs artist={artist}/>
				</div>
				<div className="flex items-start w-full">
					<ArtistDiscography artistId={artist.id}/>
				</div>
				<ArtistAbout artist={artist}/>
			</div>
		</>
	)
}