import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const toolsBarVariants = cva(" ", {
	variants: {
		variant: {
			followed: "",
			single: "",
			album: "",
			playlist: "",
			artist: ""
		}
	}
})

interface IToolsBarVariants
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof toolsBarVariants> { }

export interface IToolsBar extends IToolsBarVariants {
	artistId: string,
}