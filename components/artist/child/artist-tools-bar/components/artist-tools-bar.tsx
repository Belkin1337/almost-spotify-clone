"use client"

import { MouseEvent, useCallback, useEffect } from "react"
import { SongShuffleButton } from "@/components/song/child/song-shuffle-button/components/song-shuffle-button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/ui/dropdown-menu"
import { X, Radio } from 'lucide-react';
import { ArtistFollowButton } from "@/components/artist/child/artist-follow-button/components/artist-follow-button";
import { IToolsBar } from "@/components/artist/child/artist-tools-bar/types/artist-tools-bar-types";
import { ArtistPlayButton } from "@/components/artist/profile/components/artist-play-button";
import { useArtistSongListQuery } from "@/lib/query/artist/artists-songs-list-query";
import { MoreIcon } from "@/ui/icons/more-icon";
import { Typography } from "@/ui/typography";
import { useArtistFollow } from "@/components/artist/child/artist-follow-button/hooks/use-artist-follow";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { UserPlus } from 'lucide-react';

export const ArtistToolsBar = ({
	artistId,
}: IToolsBar) => {
	const { toast } = useToast()
	const { data: artistSongsList } = useArtistSongListQuery(artistId)
	const { followedArtist, followMutation } = useArtistFollow(artistId);

	const handleFollow = useCallback(async (
		e: MouseEvent<HTMLDivElement>
	) => {
		e.stopPropagation();
		await followMutation.mutateAsync()
	}, [followMutation])

	useEffect(() => {
		if (followMutation.isSuccess) {
			const variantToast = {
				message: (followMutation.data === 'unfollowed')
					? "unfollowed"
					: (followMutation.data === 'followed')
						? 'followed'
						: '',
				variant: (followMutation.data === 'unfollowed')
					? "red" as "red"
					: (followMutation.data === 'followed')
						? "right" as "right"
						: '' as "red"
			}

			toast({
				title: variantToast.message,
				variant: variantToast.variant,
			})
		}
	}, [followMutation.isSuccess, followedArtist, toast, followMutation.data])

	return (
		<div className="flex items-center justify-between w-full">
			<div className="flex gap-x-8 items-center">
				<ArtistPlayButton song_list={artistSongsList || []}/>
				<div className="flex items-center gap-x-6">
					<SongShuffleButton/>
					<ArtistFollowButton artistId={artistId}/>
					<DropdownMenu>
						<DropdownMenuTrigger>
							<MoreIcon/>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start">
							<DropdownMenuItem
								className="flex justify-start gap-x-2 items-center"
								onClick={handleFollow}
							>
								{followedArtist?.data?.artist_id === artistId ? (
									<>
										<X size={18} className="text-jade-500"/>
										<Typography size="small" text_color="white">
											Unfollow
										</Typography>
									</>
								) : (
									<>
										<UserPlus size={18} className="text-neutral-400"/>
										<Typography size="small" text_color="white">
											Follow
										</Typography>
									</>
								)}
							</DropdownMenuItem>
							<DropdownMenuItem className="flex justify-start gap-x-2 items-center">
								<Radio size={18} className="text-neutral-400"/>
								<Typography size="small" text_color="white">
									Go to artist Radio
								</Typography>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</div>
	)
}