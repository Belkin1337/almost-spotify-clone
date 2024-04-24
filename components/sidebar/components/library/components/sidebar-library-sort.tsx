import { Badge } from "@/ui/badge";
import { Typography } from "@/ui/typography";
import { useResizePanelsQuery } from "@/lib/query/ui/resize-panels-query";

export const SidebarLibrarySort = () => {
	const { data: resizeState } = useResizePanelsQuery()

	if (resizeState.sidebarPanel.isCollapsed) return;

	return (
		<div className="flex items-center gap-x-2 px-2">
			<Badge>
				<Typography>
					Playlists
				</Typography>
			</Badge>
			<Badge>
				<Typography>
					Albums
				</Typography>
			</Badge>
			<Badge>
				<Typography>
					Artists
				</Typography>
			</Badge>
		</div>
	)
}