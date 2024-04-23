import { cva, VariantProps } from "class-variance-authority";
import React, { ReactNode } from "react";
import { ArtistEntity } from "@/types/artist";

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
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof artistListenersVariants> {
	artist: ArtistEntity
}
