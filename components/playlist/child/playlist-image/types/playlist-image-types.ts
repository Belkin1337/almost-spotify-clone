import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";
import { PlaylistEntity } from "@/types/playlist";

export const playlistImageVariants = cva("flex justify-center items-center bg-black overflow-hidden", {
	variants: {
		variant: {
			default: "h-[420px]",
			library: "min-h-[48px] max-h-[48px] min-w-[48px] max-w-[48px] rounded-md",
			// list: "w-[200px] h-[200px] rounded-full",
			// select: "w-[32px] h-[32px] rounded-full",
			// search: "w-[160px] h-[160px] rounded-full",
			// medium: "w-[112px] h-[112px] rounded-full",
			// profile: "w-[256px] h-[256px] rounded-full"
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