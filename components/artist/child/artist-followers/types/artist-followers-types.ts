import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

export const artistFollowersVariants = cva("", {
	variants: {
		variant: {
			default: ""
		}
	}
})

export interface IArtistFollowersBlock extends HTMLAttributes<HTMLDivElement>,
	VariantProps<typeof artistFollowersVariants> {}