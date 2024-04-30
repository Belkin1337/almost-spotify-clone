import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";
import { PlaylistEntity } from "@/types/playlist";

export const playlistImageVariants = cva("flex justify-center items-center bg-black overflow-hidden", {
	variants: {
		variant: {
			default: "h-[420px]",
			library: "min-h-[48px] max-h-[48px] min-w-[48px] max-w-[48px] rounded-md",
			form: "h-[256px] w-[256px] rounded-md"
		}
	},
	defaultVariants: {
		variant: "default"
	}
})

export interface IPlaylistImage
	extends HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof playlistImageVariants> {
	playlist: PlaylistEntity
}