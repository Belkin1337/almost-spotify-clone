import { Badge } from "@/ui/badge";
import { Typography } from "@/ui/typography";
import { useResizePanelsQuery } from "@/lib/query/ui/resize-panels-query";
import { X } from "lucide-react";
import { SidebarLibrarySorts, useSortSidebarLibraryQuery } from "@/lib/query/ui/sidebar-sort-query";
import { useSortSidebarLibrary } from "@/components/sidebar/components/library/hooks/use-sort-sidebar-library";
import { Button } from "@/ui/button";

const SIDEBAR_SORT_LIST = [
	{ name: "Playlists" },
	{ name: "Albums" },
	{ name: "Artists" }
]

export const SidebarLibrarySort = () => {
	const { data: resizeState } = useResizePanelsQuery()
	const { setNewSortType } = useSortSidebarLibrary();
	const { data: sidebarSort } = useSortSidebarLibraryQuery()

	const handleClick = (sortType: Partial<SidebarLibrarySorts>) => {
		setNewSortType.mutate({ sort: sortType });
	};

	const getBadgeType = (sortType: keyof SidebarLibrarySorts) => {
		return sidebarSort.sort[sortType] ? "active" : "no_active";
	};

	if (resizeState.sidebarPanel.isCollapsed) return;

	return (
		<div className="flex items-center gap-x-2 px-2 relative">
			{(sidebarSort.sort.albums || sidebarSort.sort.artists || sidebarSort.sort.playlists) && (
				<Button
					variant="selected"
					onClick={() => handleClick({ all: true })}
				>
					<X/>
				</Button>
			)}
			{SIDEBAR_SORT_LIST.map(item => (
				<Badge
					key={item.name}
					type={getBadgeType(item.name.toLowerCase() as keyof SidebarLibrarySorts)}
					onClick={() => {
						const name = item.name.toLowerCase() as keyof SidebarLibrarySorts;

						handleClick({
							[name]: true
						})}}
					>
					<Typography className="capitalize">
						{item.name}
					</Typography>
				</Badge>
			))}
		</div>
	)
}