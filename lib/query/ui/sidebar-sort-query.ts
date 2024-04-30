import { useQuery } from "@tanstack/react-query";
import { sidebarLibrarySortQueryKey } from "@/lib/querykeys/ui";

export type SidebarLibrarySorts = {
	all: boolean,
	playlists: boolean,
	albums: boolean,
	artists: boolean
}

export type SidebarLibrarySortType = {
	sort: Partial<SidebarLibrarySorts>
}

const initial: SidebarLibrarySortType = {
	sort: {
		all: true,
	}
}

export const useSortSidebarLibraryQuery = () => {
	return useQuery<SidebarLibrarySortType, Error>({
		queryKey: sidebarLibrarySortQueryKey,
		initialData: initial,
		gcTime: Infinity,
		staleTime: Infinity
	})
}