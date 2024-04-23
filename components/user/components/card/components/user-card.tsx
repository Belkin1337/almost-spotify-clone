"use client"

import React from "react"
import { UserEntity } from "@/types/user"
import { UserName } from "../../child/user-name/components/user-name"
import { useUserQuery } from "@/lib/query/user/user-query"
import { Typography } from "@/ui/typography"
import { FaCircle } from "react-icons/fa";
import { UserAvatar } from "@/components/user/components/child/user-avatar/components/user-avatar";
import { IUserCard, userCardVariants } from "@/components/user/components/card/types/user-card-types";

export const UserCard = ({
	variant,
	followed_songs_length,
	className,
}: IUserCard) => {
	const { data: user } = useUserQuery();

	if (!user) return;

	return (
		<div className={userCardVariants(({ variant, className }))}>
			<UserAvatar
				user={user}
				variant="playlist"
				rounded="full"
			/>
			<UserName
				user={user as UserEntity}
				variant={variant === "miniauture" ? "playlist" : "profile"}
			/>
			{variant === "miniauture" && (
				<>
					<FaCircle size={4} className="fill-white"/>
					<Typography className="text-sm font-normal">
						{followed_songs_length} songs
					</Typography>
				</>
			)}
		</div>
	)
}