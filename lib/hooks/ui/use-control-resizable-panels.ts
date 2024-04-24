import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";

export const resizeStateQueryKey: QueryKey = ["resize_state"];

export interface IPanelState {
	sidebarPanel: {
		controlled?: boolean,
		isCollapsed?: boolean,
		isExpanded?: boolean
	}
}

export const useControlResizablePanels = () => {
	const queryClient = useQueryClient();

	const updatePanelSizeMutation = useMutation({
		mutationFn: async (
			newValues: IPanelState
		) => {
			queryClient.setQueryData<IPanelState>(
				resizeStateQueryKey,
				(prev) => {
					return {
						...prev,
						...newValues
					}
				}
			)
		},
	})

	return { updatePanelSizeMutation }
}