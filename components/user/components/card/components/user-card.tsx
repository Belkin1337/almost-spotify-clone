import React, { MouseEvent, useCallback } from "react"
import { Typography } from "@/ui/typography"
import { useRouter } from "next/navigation"
import { profile_route } from "@/lib/constants/routes/routes"
import { UserEntity } from "@/types/user";
import { UserAvatar } from "@/components/user/components/child/user-avatar/components/user-avatar";

export const UserCard = ({
	user
}: {
	user: UserEntity
}) => {
	const { push } = useRouter();

	const handlePushArtist = useCallback((e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation()
		push(`${profile_route}/${user?.id}`)
	}, [user?.id, push])

	return (
		<div
			onClick={handlePushArtist}
			className="flex flex-col w-[220px] p-4 hover:bg-neutral-800 gap-y-4 overflow-hidden cursor-pointer rounded-md"
		>
			<div className="flex flex-col items-center w-full">
				<UserAvatar user={user}/>
			</div>
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