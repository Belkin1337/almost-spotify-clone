"use client"

import { Typography } from "@/ui/typography"

type SongTimestampType = {
	date: string
}

export const SongTimestamp = ({
	date
}: SongTimestampType) => {
	return (
		<Typography
			text_color="gray"
			font="normal"
			size="small"
		>
			{date}
		</Typography>
	)
}