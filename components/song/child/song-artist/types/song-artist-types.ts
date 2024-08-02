import { ArtistEntity } from "@/types/artist";
import { cva, VariantProps } from "class-variance-authority"
import { HTMLAttributes } from "react"

export const songAuthorVariants = cva("text-neutral-400 truncate", {
	variants: {
		variant: {
			default: "hover:underline hover:cursor-pointer text-sm",
			player: "hover:underline hover:cursor-pointer text-sm",
			widget: "hover:underline text-lg cursor-pointer font-medium",
			widget_title: "text-white !font-bold hover:underline hover:cursor-pointer",
			page: "hover:underline hover:cursor-pointer text-sm"
		}
	},
	defaultVariants: {
		variant: "default"
	}
})

export interface ISongArtist
	extends HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof songAuthorVariants> {
	firstArtist: ArtistEntity,
	artists: ArtistEntity[],
	isLoading?: boolean
}