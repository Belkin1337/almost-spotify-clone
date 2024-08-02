import React, { MouseEvent, useCallback } from "react"
import { Typography } from "@/ui/typography"
import { useRouter } from "next/navigation"
import { profile_route } from "@/lib/constants/routes/routes"
import { UserEntity } from "@/types/user";
import { Avatar } from "@/ui/avatar";
import { useUserAvatar } from "@/components/user/components/child/user-avatar/hooks/use-user-avatar";

export const UserCard = ({
	user
}: {
	user: UserEntity
}) => {
	const { push } = useRouter();
	const { data: avatar } = useUserAvatar(user.id)

	const handlePushUser = useCallback((e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation()
		push(profile_route(user?.id))
	}, [user?.id, push])

	if (!user) return;
	
	return (
		<div
			onClick={handlePushUser}
			className="flex flex-col w-[220px] p-4 hover:bg-neutral-800 gap-y-4 overflow-hidden cursor-pointer rounded-md"
		>
			<Avatar
				rounded="full"
				user={user}
			/>
			<div className="flex flex-col">
				<Typography size="medium" font="medium">
					{user.full_name}
				</Typography>
				<Typography size="small" text_color="gray">
					Profile
				</Typography>
			</div>
		</div>
	)
}