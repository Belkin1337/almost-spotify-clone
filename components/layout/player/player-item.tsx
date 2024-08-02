"use client"

import { UserEntity } from "@/types/user";
import dynamic from "next/dynamic";

const Player = dynamic(() => import('@/components/player/player')
	.then(mod => mod.Player));

type PlayerItemsProps = {
	user: UserEntity
}

export const PlayerItem = ({
	user
}: PlayerItemsProps) => {
	return <Player user={user as UserEntity}/>
}