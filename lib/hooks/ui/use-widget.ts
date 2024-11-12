import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { widgetQueryKey } from "@/lib/querykeys/ui";

type WidgetType = {
	isOpen: boolean
}

const initial: WidgetType = { isOpen: false }

export const useWidget = () => {
	const queryClient = useQueryClient();
	
	const widgetState = useQuery<WidgetType, Error>({
		queryKey: widgetQueryKey, initialData: initial
	})
	
	const handleWidget = useMutation({
		mutationFn: async() => {
			return queryClient.setQueryData<WidgetType | undefined>(
				widgetQueryKey,
				(prev) => ({ ...prev, isOpen: !prev?.isOpen ?? false })
			)
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: widgetQueryKey })
	})
	
	return { handleWidget, widgetState }
}