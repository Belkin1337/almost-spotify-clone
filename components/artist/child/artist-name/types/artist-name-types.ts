import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { ArtistEntity } from "@/types/artist";

export const artistNameVariants = cva("min-h-[18px]", {
	variants: {
		variant: {
			default: "hover:underline text-medium cursor-pointer text-white font-bold truncate",
			page: "text-white font-extrabold text-[82px]",
			select: "",
			search: "font-bold truncate text-medium"
		},
		type: {
			link: "hover:underline cursor-pointer"
		}
	},
	defaultVariants: {
		variant: "default"
	}
})

export interface IArtistName
	extends React.HTMLAttributes<HTMLParagraphElement>,
		VariantProps<typeof artistNameVariants> {
	artist: ArtistEntity
}