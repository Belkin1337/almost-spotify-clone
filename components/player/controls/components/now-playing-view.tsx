import { useWidget } from "@/lib/hooks/ui/use-widget";
import { UserTips } from "@/components/tooltip/components/action";
import { MonitorPlayIcon } from "@/ui/icons/monitor-play-icon";

export const NowPlayingView = () => {
	const { handleWidget, widgetState } = useWidget();

	return (
		<UserTips action="Now playing view">
			<MonitorPlayIcon onClick={() => handleWidget.mutate()} active={!widgetState.data.isOpen} />
		</UserTips>
	)
}