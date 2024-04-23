import {cva, VariantProps} from "class-variance-authority";
import React, { HTMLAttributes } from "react";

const closeButtonVariants = cva("", {
	variants: {
		variant: {
			default: `absolute top-0 right-0 z-20 cursor-pointer hover:bg-neutral-800 rounded-full opacity-70 p-2 transition hover:opacity-100 focus:outline-none
				disabled:pointer-events-none data-[state=open]:bg-neutral-100 data-[state=open]:text-neutral-500 dark:ring-offset-neutral-950
				dark:focus:ring-neutral-300 dark:data-[state=open]:bg-neutral-800 dark:data-[state=open]:text-neutral-400`
		}
	},
	defaultVariants: {
		variant: "default"
	}
})

interface ICloseButton
	extends HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof closeButtonVariants> {}

export const CloseButton = ({
	variant,
	className,
	...props
}: ICloseButton) => {
	return (
		<div className={closeButtonVariants(({ variant, className }))} {...props}/>
	)
}