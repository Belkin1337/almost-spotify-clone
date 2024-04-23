import { List, Search } from "lucide-react";
import { Typography } from "@/ui/typography";
import { useResizePanelsQuery } from "@/lib/query/ui/resize-panels-query";

export const SidebarLibrarySearch = () => {
	const { data: resizeState } = useResizePanelsQuery()

	if (resizeState.sidebarPanel.size < 17) return;

	return (
		<div className="flex items-center justify-between gap-x-2 w-full px-2">
			<Search size={18}/>
			<div className="flex items-center gap-x-1">
				<Typography text_color="gray">
					Recents
				</Typography>
				<List size={18} className="text-neutral-400"/>
			</div>
		</div>
	)
}