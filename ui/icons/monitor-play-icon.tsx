import { MonitorPlay } from "lucide-react";

export const MonitorPlayIcon = ({
	active,
	onClick
}: {
	active: boolean,
	onClick: () => void
}) => {
	return (
		<MonitorPlay
			size={18}
			className={`cursor-pointer hover:scale-[1.01] ${active ? 'text-neutral-400 hover:text-white' : 'text-jade-500'}`}
			onClick={onClick}
		/>
	)
}