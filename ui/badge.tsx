import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

const badgeVariants = cva("flex rounded-full text-small w-fit px-3 py-2 cursor-pointer border-none outline-none whitespace-nowrap", {
	variants: {
		variant: {
			default: "",
		},
		type: {
			no_active: "bg-neutral-800 !text-neutral-50",
			active: "bg-neutral-50 !text-black"
		}
	},
	defaultVariants: {
		variant: "default",
		type: "no_active"
	}
})

interface IBadge
	extends HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

export const Badge = ({
	variant,
	className,
	type,
	...props
}: IBadge) => {
	return (
		<div className={badgeVariants(({ variant, type, className }))} {...props} />
	)
}