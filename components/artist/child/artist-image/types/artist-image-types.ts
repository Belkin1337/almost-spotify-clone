import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";
import { ArtistItemProps } from "@/components/artist/types/artist-types";

export const artistImageVariants = cva("flex justify-center items-center bg-black overflow-hidden rounded-full", {
	variants: {
		variant: {
			default: "h-[420px]",
			library: "h-[48px] w-[48px]",
			list: "w-[200px] h-[200px]",
			select: "w-[32px] h-[32px]",
			search: "w-[160px] h-[160px]",
			medium: "w-[112px] h-[112px]",
			profile: "w-[256px] h-[256px]"
		}
	},
	defaultVariants: {
		variant: "default"
	}
})

export interface IArtistImage
	extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof artistImageVariants>, ArtistItemProps {}