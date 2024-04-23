import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

export const artistListenersVariants = cva("flex gap-1 overflow-hidden", {
	variants: {
		variant: {
			default: "flex-col",
			page: "flex-row items-center",
		}
	},
	defaultVariants: {
		variant: "default"
	}
})

export interface IArtistListenersBlock
	extends HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof artistListenersVariants> {}