import { useResizePanelsQuery } from "@/lib/query/ui/resize-panels-query";

export const useGridControl = () => {
	const { data: resizeState } = useResizePanelsQuery();

	const sidebarSize = resizeState.sidebarPanel.size || 0;
	let sliceSize;

	if (sidebarSize >= 33) {
		sliceSize = 5;
	} else if (sidebarSize > 30 && sidebarSize < 33) {
		sliceSize = 5;
	} else if (sidebarSize > 18 && sidebarSize < 30) {
		sliceSize = 6;
	} else if (sidebarSize < 6) {
		sliceSize = 8;
	} else {
		sliceSize = 8;
	}

	return { sliceSize }
}