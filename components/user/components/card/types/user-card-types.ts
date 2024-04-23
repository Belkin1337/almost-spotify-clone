import { cva, VariantProps } from "class-variance-authority";
import React from "react";

export const userCardVariants = cva("flex overflow-hidden min-w-[220px] w-fit", {
	variants: {
		variant: {
			miniauture: "items-center justify-start gap-x-1"
		}
	}
})

export interface IUserCard
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof userCardVariants> {
	followed_songs_length?: number
}