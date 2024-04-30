import React, { MouseEvent, useCallback } from "react"
import { ArtistImage } from "../../../child/artist-image/components/artist-image"
import { ArtistName } from "../../../child/artist-name/components/artist-name"
import { Typography } from "@/ui/typography"
import { useRouter } from "next/navigation"
import { artist_route_profile } from "@/lib/constants/routes/routes"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/tooltip";
import { artistCardVariants, IArtistCard } from "@/components/artist/components/card/types/artist-card-types";
import { Skeleton } from "@/ui/skeleton";

export const ArtistCard = ({
	variant,
	artist,
	className,
	children,
	isLoading
}: IArtistCard) => {
	const { push } = useRouter();

	const handlePushArtist = useCallback((e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation()
		push(`${artist_route_profile}/${artist?.id}`)
	}, [artist?.id, push])

	if (isLoading) {
		return <Skeleton className={artistCardVariants(({ variant, className }))} />
	}

	return (
		<div
			onClick={handlePushArtist}
			className={artistCardVariants(({ variant, className }))}
		>
			{variant === 'list' && (
				<Tooltip>
					<TooltipTrigger className="absolute top-4 right-4 bg-black/80 rounded-md flex p-2 flex-col">
						ID
					</TooltipTrigger>
					<TooltipContent>
						<Typography>
							{artist.id}
						</Typography>
					</TooltipContent>
				</Tooltip>
			)}
			<div className="flex flex-col items-center w-full">
				<ArtistImage
					variant={variant === 'search' ? 'search' : variant === 'list' ? 'list' : 'default'}
					artist={artist}
				/>
			</div>
			<div className="flex flex-col">
				<ArtistName variant={variant === 'search' ? 'search' : 'default'} artist={artist}/>
				{variant === 'search' && (
					<Typography size="small" text_color="gray">
						Artist
					</Typography>
				)}
			</div>
			{children}
		</div>
	)
}