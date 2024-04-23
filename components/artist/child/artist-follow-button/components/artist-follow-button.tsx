import { Button } from "@/ui/button";
import { Typography } from "@/ui/typography";
import React, { MouseEvent, useCallback } from "react";
import { useArtistFollow } from "@/components/artist/child/artist-follow-button/hooks/use-artist-follow";

export const ArtistFollowButton = ({
	artistId
}: {
	artistId: string
}) => {
	const { followedArtist, followMutation } = useArtistFollow(artistId);

	const handleFollow = useCallback(async (
		e: MouseEvent<HTMLButtonElement>
	) => {
		e.stopPropagation();
		await followMutation.mutateAsync()
	}, [followMutation])

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