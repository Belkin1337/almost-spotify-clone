import {ToggleWidgetButton} from "@/components/widget/components/child/widget-close-button";

export const SongWidget = ({
	children
}: {
	children: React.ReactNode
}) => {
	return (
		<div className="flex flex-col relative pt-2 gap-y-4">
			<ToggleWidgetButton />
			{children}
		</div>
	)
}