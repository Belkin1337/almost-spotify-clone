import { cva, VariantProps } from "class-variance-authority";
import React, { HTMLAttributes } from "react";

const itemLoaderVariants = cva("flex playing-status", {
	variants: {
		variant: {
			default: "",
			song: "group-hover:hidden"
		}
	},
	defaultVariants: {
		variant: "default"
	}
})

interface IItemLoader
	extends HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof itemLoaderVariants> {}

export const SongPlayingBar = ({
	variant,
	className,
}: IItemLoader) => {
	return (
		<div className={itemLoaderVariants(({variant, className}))} >
			<div className="playing-status-item"/>
			<div className="playing-status-item"/>
			<div className="playing-status-item"/>
			<div className="playing-status-item"/>
		</div>
	)
}