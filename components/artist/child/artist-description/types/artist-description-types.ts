import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";
import { ArtistItemProps } from "@/components/artist/types/artist-types";

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
		VariantProps<typeof artistDescriptionVariants>, ArtistItemProps {}