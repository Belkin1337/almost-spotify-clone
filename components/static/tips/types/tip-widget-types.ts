import { HTMLAttributes, ReactNode } from "react";
import { cva, VariantProps } from "class-variance-authority";

export const tipWidgetVariants = cva("flex bg-neutral-100 h-fit z-10 text-neutral-900 relative text-md font-medium px-4 py-2 rounded-xl pr-8 focus-within:scale-[1.02] transition-all overflow-hidden min-w-[42px]", {
	variants: {
		variant: {
			active: ""
		}
	}
})


export interface ITipWidget extends HTMLAttributes<HTMLDivElement>,
	VariantProps<typeof tipWidgetVariants> {
	children: ReactNode
}