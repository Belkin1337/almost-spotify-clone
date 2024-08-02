"use client"

import { FaPen } from "react-icons/fa"
import { useDialog } from "@/lib/hooks/ui/use-dialog"
import { UpdateAvatarForm } from "@/components/forms/user/personal/avatar/components/update-avatar-form"
import { Avatar } from "@/ui/avatar";
import { IUserAvatar } from "@/components/user/components/child/user-avatar/types/user-avatar-types";
import { Typography } from "@/ui/typography";

export const UserAvatar = ({
	user,
	currentUser,
	variant,
	rounded
}: IUserAvatar) => {
	const { openDialog } = useDialog();

	return (
		<div className="flex items-center justify-center relative overflow-hidden group rounded-full h-[248px] w-[248px]">
			<Avatar
				variant={variant || 'default'}
				rounded={rounded || 'full'}
				user={user}
			/>
			{currentUser && (
				<div
					onClick={() => openDialog({ dialogChildren: <UpdateAvatarForm/> })}
					className="group-hover:flex flex-col gap-y-4 cursor-pointer items-center justify-center hidden w-full top-0 bg-black/60 right-0 left-0 bottom-0 absolute h-full"
				>
					<FaPen size={46}/>
					<Typography font="semibold">
						Выбрать фото
					</Typography>
				</div>
			)}
		</div>
	)
}