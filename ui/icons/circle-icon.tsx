import { FaCircle } from "react-icons/fa"
import { cva, VariantProps } from "class-variance-authority"

const circleIconVariants = cva("", {
	variants: {
		variant: {
			white: "fill-white",
			gray: "fill-neutral-400"
		},
		size: {
			mini: 4,
			medium: 12,
			large: 20
		}
	},
	defaultVariants: {
		variant: "white",
		size: "medium"
	}
})

interface ICircleIcon extends VariantProps<typeof circleIconVariants> {}

export const CircleIcon = ({
	variant,
	size
}: ICircleIcon) => {
	return (
		<FaCircle
			size={circleIconVariants({ size })}
			className={circleIconVariants({ variant })}
		/>
	)
}