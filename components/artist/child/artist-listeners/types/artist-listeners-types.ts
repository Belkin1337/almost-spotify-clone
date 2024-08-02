import { cva, VariantProps } from "class-variance-authority";
import { ArtistItemProps } from "@/components/artist/types/artist-types";
import { HTMLAttributes } from "react"

export const artistListenersVariants = cva("text-white", {
	variants: {
		variant: {
			default: "font-semibold text-medium",
			page: "text-lg font-medium",
			card: "text-neutral-400 text-medium font-semibold"
		}
	},
	defaultVariants: {
		variant: "default"
	}
})

export interface IArtistListeners
	extends HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof artistListenersVariants>, ArtistItemProps {}