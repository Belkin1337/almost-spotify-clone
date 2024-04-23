import { UserEntity } from "@/types/user";
import { VariantProps } from "class-variance-authority";
import { avatarVariants } from "@/ui/avatar";

export interface IUserAvatar {
	user: UserEntity,
	currentUser?: boolean,
	variant?: VariantProps<typeof avatarVariants>['variant'],
	rounded?: VariantProps<typeof avatarVariants>['rounded']
}