import { MediaLibraryIcon } from "@/ui/icons/media-library";
import { Typography } from "@/ui/typography";
import { useScopedI18n } from "@/locales/client";
import { useResizePanelsQuery } from "@/lib/query/ui/resize-panels-query";

export const SidebarLibraryTitle = () => {
	const libraryLocale = useScopedI18n('main-service.sidebar.widgets')
	const { data: resizeState } = useResizePanelsQuery()

	return (
		<div className="flex gap-x-2 items-center">
			<MediaLibraryIcon/>
			{resizeState.sidebarPanel.size > 17 && (
				<Typography text_color="gray" font="medium" size="xl">
					{libraryLocale('media-library')}
				</Typography>
			)}
		</div>
	)
}