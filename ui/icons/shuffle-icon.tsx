import { Shuffle } from "lucide-react";

export const ShuffleIcon = ({
	active
}: {
	active: boolean
}) => {
	return (
		<Shuffle
			size={48}
			className={`${active ? 'text-jade-500' : 'text-neutral-400'} hover:scale-[1.06]`}
		/>
	)
}