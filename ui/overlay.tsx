import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

const overlayVariants = cva("absolute w-full top-0 right-0 left-0 bottom-0", {
	variants: {
		variant: {
			black: "bg-black/40"
		}
	}
})

interface IOverlay
	extends HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof overlayVariants> {}

export const Overlay = ({
	variant,
	className,
	...props
}: IOverlay) => {
	return (
		<div className={overlayVariants(({ variant, className }))} {...props} />
	)
}