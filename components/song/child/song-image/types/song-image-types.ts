import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes, ReactNode } from "react";
import { SongEntity } from "@/types/song";

export const songImageVariants = cva("relative group justify-self-start overflow-hidden", {
	variants: {
		variant: {
			follow: "h-[42px] w-[42px] rounded-md",
			library: "h-[44px] w-[44px] rounded-md",
			player: "h-[60px] w-[60px] cursor-pointer rounded-md",
			widget: "aspect-square w-full h-full rounded-lg cursor-pointer",
			select: "h-[34px] w-[34px] rounded-md",
			page: "w-[224px] h-[224px] rounded-md shadow-lg shadow-black hover:scale-[1.06] hover:duration-100 duration-100",
			card: "w-[100px] h-[100px] rounded-full"
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