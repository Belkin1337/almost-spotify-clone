import { SidebarLibraryPlaylist } from "@/components/sidebar/components/library/components/sidebar-library-playlist";
import { SidebarLibraryShowMore } from "@/components/sidebar/components/library/components/sidebar-library-show-more";
import { useResizePanelsQuery } from "@/lib/query/ui/resize-panels-query";

export const SidebarLibraryTools = () => {
	const { data: resizeState } = useResizePanelsQuery()

	if (resizeState.sidebarPanel.size < 17) return;

	return (
		<div className="flex items-center gap-x-2">
			<SidebarLibraryPlaylist/>
			<SidebarLibraryShowMore/>
		</div>
	)
}