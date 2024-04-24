import { useQuery } from "@tanstack/react-query";
import { IPanelState, resizeStateQueryKey } from "@/lib/hooks/ui/use-control-resizable-panels";

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