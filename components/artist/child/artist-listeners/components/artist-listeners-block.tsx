import {
	artistListenersVariants,
	IArtistListenersBlock
} from "@/components/artist/child/artist-listeners/types/artist-listeners-block-types";

export const ArtistListenersBlock = ({
	variant, className, ...props
}: IArtistListenersBlock) => {
	return <div className={artistListenersVariants(({ variant, className }))} {...props}/>
}