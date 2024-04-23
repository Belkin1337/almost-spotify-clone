import {
	artistFollowersVariants,
	IArtistFollowersBlock
} from "@/components/artist/child/artist-followers/types/artist-followers-types";

export const ArtistFollowersBlock = ({
	variant,
	className,
	...props
}: IArtistFollowersBlock) => {
	return (
		<div className={artistFollowersVariants(({
			variant,
			className
		}))}
				 {...props}
		/>
	)
}