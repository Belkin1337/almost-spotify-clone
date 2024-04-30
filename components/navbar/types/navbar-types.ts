import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";
import { UserEntity } from "@/types/user";

export const navbarVariants = cva("transition-all duration-300 ease-in h-[64px] z-[600] flex items-center justify-between p-4 w-full rounded-t-lg", {
	variants: {
		type: {
			inView: "absolute top-0 right-0 left-0",
			noInView: "relative bg-transparent"
		}
	},
	defaultVariants: {
		type: "inView"
	}
})

export interface INavbar extends HTMLAttributes<HTMLDivElement>,
	VariantProps<typeof navbarVariants> {
	user: UserEntity
	inView: boolean
}