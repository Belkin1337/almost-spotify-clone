import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resizeStateQueryKey } from "@/lib/querykeys/ui";

export interface IPanelState {
	sidebarPanel: {
		size?: number,
		controlled?: boolean,
		isCollapsed?: boolean,
		isExpanded?: boolean
	}
}

export const useControlResizablePanels = () => {
	const queryClient = useQueryClient();
	
	const updatePanelSizeMutation = useMutation({
		mutationFn: async(newValues: IPanelState) => {
			return queryClient.setQueryData<IPanelState>(
				resizeStateQueryKey,
				(prev) => {
					return { ...prev, ...newValues }
				}
			)
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: resizeStateQueryKey })
	})
	
	return { updatePanelSizeMutation }
}