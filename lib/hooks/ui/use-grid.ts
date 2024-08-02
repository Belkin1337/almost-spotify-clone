import { useResizePanelsQuery } from "@/lib/query/ui/resize-panels-query";

let cols;
let rows;

function calculateCols(
	sidebarSize: number
): number {
	switch (true) {
		case (sidebarSize >= 33):
			return 6;
		case (sidebarSize > 30 && sidebarSize < 33):
			return 6;
		case (sidebarSize > 18 && sidebarSize < 30):
			return 7;
		case (sidebarSize < 18 && sidebarSize > 5):
			return 8;
		case (sidebarSize < 5):
			return 9;
		default:
			return 7;
	}
}

function calculateRows(
	sidebarSize: number
): number {
	switch (true) {
		case (sidebarSize >= 33):
			return 5;
		case (sidebarSize > 30 && sidebarSize < 33):
			return 5;
		case (sidebarSize > 18 && sidebarSize < 30):
			return 6;
		case (sidebarSize < 6):
			return 8;
		default:
			return 8;
	}
}

export const useGrid = () => {
	const { data: resizeState } = useResizePanelsQuery();

	const sidebarSize = resizeState.sidebarPanel.size || 0;

	cols = calculateCols(sidebarSize);
	rows = calculateRows(sidebarSize);

	return { cols, rows }
}