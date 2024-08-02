import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, HTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils/styles";

const playerPlayControlsButtonVariants = cva("h-9 w-9 flex items-center border active:scale-[0.9] active:duration-300 justify-center rounded-full p-1", {
	variants: {
		variant: {
			desktop: "hidden md:flex",
			mobile: "md:hidden flex"
		},
		type: {
			loaded: "bg-white",
			not_loaded: "bg-neutral-800 cursor-not-allowed"
		}
	}
})

interface IPlayerPlayControlsButton
	extends HTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof playerPlayControlsButtonVariants> {
	asChild?: boolean
}

const PlayerPlayControlsButton = forwardRef<
	HTMLButtonElement, IPlayerPlayControlsButton
>(({
	variant, className, type, asChild = false, ...props
},
	ref
) => {
	const Comp = asChild ? Slot : "button";

	return (
		<>
			<Comp
				ref={ref}
				className={cn(playerPlayControlsButtonVariants({
					variant,
					className,
					type
				}))}
				{...props}
			/>
		</>
	)
});
PlayerPlayControlsButton.displayName = 'PlayerPlayControlsButton';

export {
	PlayerPlayControlsButton,
	playerPlayControlsButtonVariants
}