import {cva, VariantProps} from "class-variance-authority";
import React, { HTMLAttributes } from "react";

const itemLoaderVariants = cva("flex bars", {
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

export const ItemLoader = ({
	variant,
	className,
}: IItemLoader) => {
	return (
		<div className={itemLoaderVariants(({variant, className}))} >
			<div className="bars__item"/>
			<div className="bars__item"/>
			<div className="bars__item"/>
			<div className="bars__item"/>
		</div>
	)
}