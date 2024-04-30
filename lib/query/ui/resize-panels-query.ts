import { useQuery } from "@tanstack/react-query";
import { IPanelState } from "@/lib/hooks/ui/use-control-resizable-panels";
import { resizeStateQueryKey } from "@/lib/querykeys/ui";

export const useResizePanelsQuery = () => {
	return useQuery<IPanelState, Error>({
		queryKey: resizeStateQueryKey,
		retry: 1,
		gcTime: Infinity,
		staleTime: Infinity,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		initialData: {
			sidebarPanel: {
				isCollapsed: false,
				isExpanded: true
			}
		},
	})
}