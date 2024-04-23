import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes, ReactNode } from "react";
import { SongEntity } from "@/types/song";

export const songImageVariants = cva("relative group justify-self-start overflow-hidden", {
	variants: {
		variant: {
			follow: "min-h-[42px] min-w-[42px] rounded-medium",
			library: "min-h-[48px] min-w-[48px] rounded-medium",
			player: "min-h-[64px] min-w-[64px] cursor-pointer md:min-h-[64px] md:min-w-[64px] rounded-medium",
			widget: "aspect-square w-full h-full rounded-lg cursor-pointer",
			select: "min-h-[34px] min-w-[34px] rounded-medium",
			page: "w-[224px] h-[224px] rounded-md shadow-lg shadow-black cursor-pointer hover:scale-[1.06] hover:duration-100 duration-100",
			card: "rounded-full w-[100px] h-[100px]"
		},
	},
	defaultVariants: {
		variant: "library"
	}
})

export interface ISongImageItem
	extends HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof songImageVariants> {
	song: SongEntity,
	children?: ReactNode
}