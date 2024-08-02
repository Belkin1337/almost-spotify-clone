"use client"

import { UserEntity } from "@/types/user"
import { UserName } from "../../child/user-name/components/user-name"
import { useUserQuery } from "@/lib/query/user/user-query"
import { Typography } from "@/ui/typography"
import { FaCircle } from "react-icons/fa";
import { IUserCard } from "@/components/user/components/card/types/user-card-types";
import { Avatar } from "@/ui/avatar";

export const UserCollectionCard = ({
	followed_songs_length,
}: IUserCard) => {
	const { data: user } = useUserQuery();

	if (!user || !followed_songs_length) return;

	return (
		<div className="flex overflow-hidden items-center justify-start gap-x-1">
			<Avatar
				variant="playlist"
				rounded="full"
				user={user}
			/>
			<UserName user={user as UserEntity} variant={"playlist"}/>
			<FaCircle size={4} className="fill-white"/>
			<Typography className="text-sm font-normal">
				{followed_songs_length} songs
			</Typography>
		</div>
	)
}