import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils/styles"

const buttonVariants = cva(`flex whitespace-nowrap ring-offset-white 
  transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed
  disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300 text-neutral-50`,
	{
		variants: {
			variant: {
				default: "bg-neutral-900 hover:bg-neutral-900/90",
				single_medium: "transition opacity-0 bg-jade-500 p-2 h-[36px] w-[36px] translate translate-y-1/3 group-hover:opacity-100 group-hover:translate-y-0 hover:scale:105",
				single_page: "p-4 translate hover:scale:105 h-[56px] w-[56px]",
				form: `relative hover:shadow-2xl hover:shadow-jade-400/[0.1] duration-200 hover:bg-neutral-700 border-transparent w-full px-4 py-2`,
				album_playlist: "items-center justify-center",
				selected: "hover:bg-neutral-800 rounded-full p-1",
				media_item: "hover:bg-neutral-700 bg-neutral-800",
			},
			padding: {
				none: "p-0",
				default: "p-4",
			},
			align: {
				centered: "items-center justify-center"
			},
			background_color: {
				default: "bg-neutral-800",
				jade: "bg-jade-500",
				"black_60": "bg-black/60",
				"black_90": "bg-white/90"
			},
			font: {
				default: "text-medium",
				bold: "text-bold",
				semibold: "text-semibold"
			},
			filter: {
				blurred: "backdrop-filter backdrop-blue-medium"
			},
			rounded: {
				none: "rounded-none",
				medium: "rounded-md",
				large: "rounded-lg",
				full: "rounded-full",
			},
			size: {
				fixed_medium: "h-[42px] w-[42px]",
				sm: "h-9",
				md: "h-[36px] w-[36px]",
				lg: "h-[56px] w-[56px]",
				icon: "h-10 w-10",
			},
		},
	}
)

export interface IButton
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, IButton>(({
			className,
			variant,
			rounded,
			font,
			size,
			padding,
			align,
			background_color,
			filter,
			asChild = false,
			...props
		},
		ref
	) => {
		const Comp = asChild ? Slot : "button";

		return (
			<>
				<Comp
					ref={ref}
					className={cn(buttonVariants({
						variant,
						size,
						background_color,
						padding,
						align,
						filter,
						font,
						rounded,
						className
					}))}
					{...props}
				/>
			</>
		)
	}
)
Button.displayName = "Button"

export { Button, buttonVariants }
