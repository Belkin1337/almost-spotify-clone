import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SidebarLibrarySortType } from "@/lib/query/ui/sidebar-sort-query";
import { sidebarLibrarySortQueryKey } from "@/lib/querykeys/ui";

export const useSortSidebarLibrary = () => {
	const queryClient = useQueryClient();

	const setNewSortType = useMutation({
		mutationFn: async (
			newValues: SidebarLibrarySortType
		) => {
			queryClient.setQueryData<SidebarLibrarySortType>(
				sidebarLibrarySortQueryKey,
				() => {
					return { ...newValues }
				}
			)
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: sidebarLibrarySortQueryKey
			})
		}
	})

	return { setNewSortType }
}