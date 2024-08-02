import { cva, VariantProps } from "class-variance-authority";
import Image from "next/image";
import { HTMLAttributes } from "react";
import { useUserAvatar } from "@/components/user/components/child/user-avatar/hooks/use-user-avatar";
import { UserEntity } from "@/types/user";
import { nullAvatarImage } from "@/lib/constants/files/invalid-or-null-images";

export const avatarVariants = cva("", {
	variants: {
		variant: {
			default: "h-full w-full object-cover",
			navbar: "h-[34px] w-[34px]",
			playlist: "h-[24px] w-[24px]",
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
	user: UserEntity
}

export const Avatar = ({
	variant,
	rounded,
	className,
	user
}: IAvatar) => {
	const { data: avatar } = useUserAvatar(user.id)

	if (!user) return;

	return (
		<Image
			src={avatar || nullAvatarImage}
			width={248}
			height={248}
			alt={user.full_name || ""}
			className={avatarVariants(({
				variant,
				rounded,
				className
			}))}
		/>
	)
}