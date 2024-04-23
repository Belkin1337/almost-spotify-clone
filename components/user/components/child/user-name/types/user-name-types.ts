import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";
import { UserEntity } from "@/types/user";

export const userNameVariants = cva("text-white", {
	variants: {
		variant: {
			profile: "text-6xl font-bold",
			playlist: "text-small font-medium hover:underline underline-offset-2 cursor-pointer",
		}
	},
	defaultVariants: {
		variant: "playlist"
	}
})

export interface IUserName
	extends HTMLAttributes<HTMLParagraphElement>,
		VariantProps<typeof userNameVariants> {
	user: UserEntity
}