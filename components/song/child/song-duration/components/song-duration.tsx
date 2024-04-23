import { Typography } from "@/ui/typography"

export const SongDuration = ({
	duration
}: {
	duration: string
}) => {
	return (
		<Typography text_color="gray" font="normal" size="small">
			{duration}
		</Typography>
	)
}