import { useQuery } from "@tanstack/react-query";
import { IPanelState, resizeStateQueryKey } from "@/lib/hooks/ui/use-control-resizable-panels";

export const useResizePanelsQuery = () => {
	return useQuery<IPanelState, Error>({
		queryKey: resizeStateQueryKey,
		retry: 1,
		initialData: {
			sidebarPanel: {
				id: null,
				size: 18
			}
		},
		refetchOnMount: false,
		refetchOnWindowFocus: false
	})
}