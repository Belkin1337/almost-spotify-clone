"use client"

import { UserAvatar } from "../../child/user-avatar/components/user-avatar";
import { useEffect, useState } from "react";
import { UserPublicPlaylists } from "../../child/user-playlists/components/user-public-playlists";
import { UserName } from "../../child/user-name/components/user-name";
import { ColoredBackground } from "@/ui/colored-background";
import { Typography } from "@/ui/typography";
import { UserToolsBar } from "@/components/user/components/child/user-tools-bar/components/user-tools-bar";
import {
	UserTopListenedArtist
} from "@/components/user/components/child/user-top/user-top-listened-artists/components/user-top-listened-artist";
import { UserSubsList } from "@/components/user/components/child/user-subs-list/components/user-subs-list";
import {
	UserFollowedArtists
} from "@/components/user/components/child/user-followed-artists/components/user-followed-artists";
import { useUserByIdQuery } from "@/lib/query/user/user-id-query";
import { ProfileUserType } from "@/components/user/components/profile/types/user-profile-types";
import { useUserAvatar } from "@/components/user/components/child/user-avatar/hooks/use-user-avatar";
import { UserStats } from "@/components/user/components/child/user-stats/components/user-stats";
import { UserFollowButton } from "@/components/user/components/child/user-follow-button/components/user-follow-button";

export const ProfileUser = ({
	userId,
	user
}: ProfileUserType) => {
	const [currentUser, setCurrentUser] = useState(false);
	const { data: avatar } = useUserAvatar(userId)
	const { data: userById } = useUserByIdQuery(userId);

	useEffect(() => {
		if (user?.id === userById?.id) {
			setCurrentUser(true)
		} else setCurrentUser(false)
	}, [user, userById]);

	if (!userById) return;

	return (
		<>
			<ColoredBackground imageUrl={avatar}/>
			<div className="flex relative items-start p-6">
				<div className="flex items-center gap-x-8">
					<UserAvatar user={userById} currentUser={currentUser}/>
					<div className="flex flex-col self-end justify-between gap-y-4">
						<Typography font="medium" text_color="white" size="medium">
							Профиль
						</Typography>
						<UserName user={userById} variant="profile"/>
						<UserStats user={userById}/>
					</div>
				</div>
			</div>
			<div
				className="flex flex-col h-full bg-gradient-to-b from-black/20 to-transparent backdrop-filter backdrop-blur-md">
				<div className="flex flex-col gap-y-12 p-6">
					{currentUser && (
						<>
							<UserToolsBar/>
							<UserTopListenedArtist user={user}/>
						</>
					)}
					{!currentUser && (
						<UserFollowButton userId={userById.id}/>
					)}
					<UserPublicPlaylists userId={userById.id}/>
					<UserSubsList userId={userById.id}/>
					<UserFollowedArtists user={userById}/>
				</div>
			</div>
		</>
	)
}