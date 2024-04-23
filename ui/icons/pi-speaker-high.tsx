import { PiSpeakerSimpleHighThin } from "react-icons/pi";

export const PiSpeakerHigh = ({
	onClick
}: {
	onClick: () => void
}) => {
	return (
		<PiSpeakerSimpleHighThin
			onClick={onClick}
			size={19}
			className="cursor-pointer hover:text-white"
		/>
	)
}