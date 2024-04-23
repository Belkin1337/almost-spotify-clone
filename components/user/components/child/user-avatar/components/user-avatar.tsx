"use client"

import { FaPen } from "react-icons/fa"
import { useDialog } from "@/lib/hooks/ui/use-dialog"
import { UpdateAvatarForm } from "@/components/forms/user/personal/avatar/components/update-avatar"
import { Avatar } from "@/ui/avatar";
import { IUserAvatar } from "@/components/user/components/child/user-avatar/types/user-avatar-types";
import { useUserAvatar } from "@/components/user/components/child/user-avatar/hooks/use-user-avatar";
import { Typography } from "@/ui/typography";

export const UserAvatar = ({
	user,
	currentUser,
	variant,
	rounded
}: IUserAvatar) => {
	const { data: avatar } = useUserAvatar(user.id)
	const { openDialog } = useDialog();

	return (
		<>
			<Avatar
				variant={variant || 'default'}
				rounded={rounded || 'full'}
				src={avatar as string}
				alt={user.full_name || 'user'}
			/>
			{currentUser && (
				<div
					onClick={() => openDialog({
						dialogChildren: <UpdateAvatarForm/>
					})}
					className="group-hover:flex flex-col gap-y-4 cursor-pointer items-center justify-center hidden w-full top-0 bg-black/60 right-0 left-0 bottom-0 absolute h-full"
				>
					<FaPen size={46}/>
					<Typography font="semibold">
						Выбрать фото
					</Typography>
				</div>
			)}
		</>
	)
}