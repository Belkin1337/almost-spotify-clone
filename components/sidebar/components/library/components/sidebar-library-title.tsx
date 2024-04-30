import { MediaLibraryIcon } from "@/ui/icons/media-library";
import { Typography } from "@/ui/typography";
import { useScopedI18n } from "@/locales/client";
import { useResizePanelsQuery } from "@/lib/query/ui/resize-panels-query";
import { useControlResizablePanels } from "@/lib/hooks/ui/use-control-resizable-panels";
import { useCallback } from "react";
import { UserTips } from "@/components/tooltip/components/action";

export const SidebarLibraryTitle = () => {
	const libraryLocale = useScopedI18n('main-service.sidebar.widgets')
	const { data: resizeState } = useResizePanelsQuery()
	const { updatePanelSizeMutation } = useControlResizablePanels()

	const isExpanded = resizeState.sidebarPanel.isExpanded;

	const handleResizePanel = useCallback(() => {
		if (resizeState.sidebarPanel.isExpanded) {
			updatePanelSizeMutation.mutate({
				sidebarPanel: {
					controlled: true,
					isExpanded: false,
					isCollapsed: true
				}
			})
		}	else if (resizeState.sidebarPanel.isCollapsed) {
			updatePanelSizeMutation.mutate({
				sidebarPanel: {
					controlled: true,
					isExpanded: true,
					isCollapsed: false
				}
			})
		}
	}, [
		updatePanelSizeMutation,
		resizeState.sidebarPanel.controlled,
		resizeState.sidebarPanel.isCollapsed,
		resizeState.sidebarPanel.isExpanded
	])

	const tip = resizeState.sidebarPanel.isExpanded ? 'Collapse sidebar' : 'Expand sidebar';

	return (
		<div className="flex gap-x-2 items-center">
			<UserTips action={tip}>
				<div className="flex items-center justify-center">
					<MediaLibraryIcon onClick={handleResizePanel}/>
				</div>
			</UserTips>
			{isExpanded && (
				<Typography text_color="gray" font="semibold" size="base">
					{libraryLocale('media-library')}
				</Typography>
			)}
		</div>
	)
}