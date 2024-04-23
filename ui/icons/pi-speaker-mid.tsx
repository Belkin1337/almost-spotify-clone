import { PiSpeakerSimpleLowThin } from "react-icons/pi";

export const PiSpeakerMid = ({
	onClick
}: {
	onClick: () => void
}) => {
	return (
		<PiSpeakerSimpleLowThin
			onClick={onClick}
			size={24}
			className="cursor-pointer hover:text-white"
		/>
	)
}