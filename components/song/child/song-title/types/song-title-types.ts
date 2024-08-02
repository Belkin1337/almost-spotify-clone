import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";
import { SongEntity } from "@/types/song";

export const songTitleVariants = cva("text-white truncate", {
	variants: {
		variant: {
			default: "text-sm font-medium",
			card: "font-bold text-lg",
			page: "font-bold text-6xl",
			player: "hover:underline hover:cursor-pointer text-sm font-medium",
			widget: "hover:underline text-xl cursor-pointer font-bold"
		},
		decoration: {
			underline: "hover:underline",
			pointer: "hover:cursor-pointer"
		},
		type: {
			link: "hover:underline hover:cursor-pointer"
		}
	},
	defaultVariants: {
		variant: "default"
	}
})

export interface ISongTitle
	extends HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof songTitleVariants> {
	song: SongEntity,
	player?: boolean,
	isLoading?: boolean
}