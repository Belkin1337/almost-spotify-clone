import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";

export const resizeStateQueryKey: QueryKey = ["resize_state"];

export interface IPanelState {
	sidebarPanel: {
		id: string | null,
		size: number
	}
}

export const useControlResizablePanels = () => {
	const queryClient = useQueryClient();

	const updatePanelSizeMutation = useMutation({
		mutationFn: async (
			newValues: IPanelState
		) => {
			queryClient.setQueryData<IPanelState>(
				resizeStateQueryKey, (prevState) => {
					return { ...prevState, ...newValues }
				})
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: resizeStateQueryKey
			})
		}
	})

	return { updatePanelSizeMutation }
}