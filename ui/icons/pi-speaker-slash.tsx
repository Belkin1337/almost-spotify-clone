import { PiSpeakerSimpleSlashThin } from "react-icons/pi";

export const PiSpeakerSlash = ({
	onClick
}: {
	onClick: () => void
}) => {
	return (
		<PiSpeakerSimpleSlashThin
			onClick={onClick}
			size={18}
			className="cursor-pointer hover:text-white"
		/>
	)
}