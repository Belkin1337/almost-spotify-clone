import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

const sortedListBlockVariants = cva("w-full h-full gap-4", {
	variants: {
		variant: {
			grid: "grid medium:grid-cols-3 lg:grid-cols-4 auto-rows-auto",
			compact: "flex flex-col items-start",
			list: "flex flex-col items-start"
		}
	},
	defaultVariants: {
		variant: "compact"
	}
})

interface ISortedListBlock
	extends HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof sortedListBlockVariants> {}

export const SortedListBlock = ({
	variant,
	className,
	...props
}: ISortedListBlock) => {
	return (
		<div className={sortedListBlockVariants(({ variant, className }))} {...props}/>
	)
}