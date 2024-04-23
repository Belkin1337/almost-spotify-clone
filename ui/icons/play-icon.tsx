import { BsPauseFill, BsPlayFill } from "react-icons/bs";

export const PlayIcon = ({
	state
}: {
	state: boolean
}) => {
	const Icon = state ? BsPauseFill : BsPlayFill;

	return (
		<Icon
			size={26}
			className="text-black"
		/>
	)
}