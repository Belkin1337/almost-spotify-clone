import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes, ReactNode } from "react";
import { SongEntity } from "@/types/song";
import { PlaylistEntity } from "@/types/playlist";

export const songItemVariants = cva("flex justify-between items-center rounded-md", {
	variants: {
		variant: {
			default: "p-2 hover:bg-neutral-700/50 group focus-within:bg-neutral-700 w-full",
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
	song: SongEntity,
	children?: ReactNode,
	song_list: {
		id?: string,
		data?: SongEntity[],
		created_at?: string
	},
	queryOptions?: {
		isLoading?: boolean,
	},
	playlist?: PlaylistEntity
}

// song_list -> target songs array (by playlist/artist/collection)
//   data -> songs array
//   id -> id by array
//   created_at -> created data by songs array
// song -> targeted song
// children -> for edit panel