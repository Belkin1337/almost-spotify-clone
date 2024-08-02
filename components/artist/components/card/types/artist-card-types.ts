import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes, ReactNode } from "react";
import { ArtistEntity } from "@/types/artist";

export const artistCardVariants = cva("flex p-4 hover:bg-neutral-800 gap-y-4 overflow-hidden cursor-pointer rounded-md", {
	variants: {
		variant: {
			search: "flex-col w-[220px]",
			list: "flex-col relative h-[320px] w-[300px]"
		}
	}
})

type ArtistCard = {
	artist: ArtistEntity,
	children?: ReactNode,
	isLoading?: boolean
}

export interface IArtistCard
	extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof artistCardVariants>,
		ArtistCard {}