"use client"

import { UserEntity } from "@/types/user";
import dynamic from "next/dynamic";
import { USER_QUERY_KEY } from "@/lib/query/user/user-query";
import { useQueryClient } from "@tanstack/react-query"

const Player = dynamic(() =>
	import('@/components/player/player').then(mod => mod.Player)
);

export const PlayerItem = () => {
	const qc = useQueryClient()
	const user = qc.getQueryData<UserEntity>(USER_QUERY_KEY)
	
	return <Player user={user as UserEntity}/>
}