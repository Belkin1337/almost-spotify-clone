import { cva, VariantProps } from "class-variance-authority";
import Image from "next/image";
import { HTMLAttributes } from "react";

export const avatarVariants = cva("", {
	variants: {
		variant: {
			default: "h-full w-full object-cover",
			navbar: "h-[34px] w-[34px]",
			playlist: "h-[24px] w-[24px]"
		},
		rounded: {
			none: "rounded-none",
			full: "rounded-full"
		}
	},
	defaultVariants: {
		variant: "default",
		rounded: "full"
	}
})

interface IAvatar
	extends HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof avatarVariants> {
	src: string,
	alt: string
}

export const Avatar = ({
	variant,
	rounded,
	className,
	src,
	alt
}: IAvatar) => {
	return (
		<Image
			src={src}
			width={600}
			height={600}
			alt={alt}
			className={avatarVariants(({
				variant,
				rounded,
				className
			}))}
		/>
	)
}