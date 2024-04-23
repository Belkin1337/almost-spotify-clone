import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";
import { ArtistEntity } from "@/types/artist";

export const artistDescriptionVariants = cva("text-neutral-400", {
	variants: {
		variant: {
			widget: "text-sm font-normal",
			dialog: "text-sm font-semibold text-left"
		}
	}
})

export interface IArtistDescription
	extends HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof artistDescriptionVariants> {
	artist: ArtistEntity
}