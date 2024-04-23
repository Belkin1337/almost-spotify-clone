import { cva, VariantProps } from "class-variance-authority";
import React, { HTMLAttributes } from "react";
import { SongEntity } from "@/types/song";

export const songItemVariants = cva("flex justify-between items-center rounded-md", {
	variants: {
		variant: {
			default: "p-2 hover:bg-neutral-700/50 group focus-within:bg-neutral-700 w-full",
			player: "w-fit",
			library: "p-2 hover:bg-neutral-700/50 cursor-pointer group min-h-[66px] w-full overflow-hidden",
			select: "p-1 cursor-pointer group min-h-[16px] w-full",
			artist_library: "p-2 min-w-[600px] w-fit max-w-[820px] group cursor-pointer overflow-hidden pr-4 hover:bg-neutral-700/50 focus-within:bg-neutral-700",
			compact: "p-1 w-full group cursor-pointer overflow-hidden hover:bg-neutral-700/50 focus-within:bg-neutral-700",
		},
		type: {
			edit: "",
			page: "",
			follow: ""
		}
	},
	defaultVariants: {
		variant: "default"
	}
})

export interface ISongItem
	extends HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof songItemVariants> {
	song_list: {
		id?: string,
		data?: SongEntity[],
		created_at?: string,
		user_id?: string
	},
	song: SongEntity,
	isLoading?: boolean,
	library?: boolean,
	children?: React.ReactNode
}