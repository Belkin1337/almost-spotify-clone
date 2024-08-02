import { Button } from "@/ui/button";
import { Typography } from "@/ui/typography";
import { MouseEvent } from "react";
import { useArtistFollow } from "@/components/artist/child/artist-follow-button/hooks/use-artist-follow";
import { ArtistItemProps } from "@/components/artist/types/artist-types";

export const ArtistFollowButton = ({
	id: artistId
}: Pick<ArtistItemProps["artist"], "id">) => {
	const { followedArtist, followMutation } = useArtistFollow(artistId);

	const handleFollow = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		followMutation.mutate()
	}

	return (
		<Button
			disabled={followMutation.isPending}
			onClick={handleFollow}
			align="centered"
			rounded="full"
			className="px-4 py-2 group border hover:scale-[1.04] hover:border-white border-neutral-500"
		>
			{followedArtist?.data?.artist_id === artistId ? (
				<Typography text_color="white" size="small" className="group-hover:scale-[1.02]">
					Following
				</Typography>
			) : (
				<Typography text_color="white" size="small" className="group-hover:scale-[1.02]">
					Follow
				</Typography>
			)}
		</Button>
	)
}