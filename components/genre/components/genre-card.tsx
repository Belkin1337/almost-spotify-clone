import { CheckedIcon } from "@/ui/icons/checked";
import { Typography } from "@/ui/typography";

export const GenreCard = ({
	name,
	isChecked
}: {
	name: string,
	isChecked?: boolean
}) => {
	return (
		<div className="flex items-center gap-x-2 px-2 py-2
			w-max hover:border-jade-500 hover:bg-neutral-800 cursor-pointer
		 bg-neutral-900 border border-neutral-700 rounded-lg">
			{isChecked && (
				<CheckedIcon/>
			)}
			<Typography>
				{name}
			</Typography>
		</div>
	)
}