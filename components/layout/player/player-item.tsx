"use client"

import { UserEntity } from "@/types/user";
import dynamic from "next/dynamic";

const Player = dynamic(() => import('@/components/player/player')
	.then(mod => mod.Player));

export const PlayerItem = ({
	user
}: {
	user: UserEntity
}) => {
	return (
		<Player user={user as UserEntity}/>
	)
}