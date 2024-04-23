"use client"

import { useUserQuery } from "@/lib/query/user/user-query";
import { useCallback, useEffect, useState } from "react";
import { usePlayerStateQuery } from "@/lib/query/player/player-state-query";

export const CalcHeight = () => {
	const [height, setHeight] = useState('h-full')
	const { playerAttributes } = usePlayerStateQuery()

	const { data: user } = useUserQuery();

	const calc = useCallback(() => {
		if (playerAttributes?.active?.id && user) {
			return 'player_active'
		} else {
			return 'player_no_active'
		}
	}, [playerAttributes?.active?.id, user])

	useEffect(() => {
		const height = calc();

		setHeight(height)
	}, [calc])

	return {
		height
	}
}