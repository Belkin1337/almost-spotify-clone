import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";
import { PlaylistEntity } from "@/types/playlist";

export const playlistTitleVariants = cva("text-white truncate", {
	variants: {
		variant: {
			default: "",
			page: "font-bold text-6xl",
		}
	}
})

export interface IPlaylistTitle extends HTMLAttributes<HTMLParagraphElement>,
	VariantProps<typeof playlistTitleVariants> {
	playlist: PlaylistEntity
}