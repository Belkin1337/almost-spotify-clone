import { useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export const MAIN_PAGE_SORT_LIST = [
	{ name: "All", },
	{ name: "Music", },
	{ name: "Podcasts", }
]

export type MainSortType = "music" | "podcasts" | "all";

export const useMainPageSort = () => {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const type = searchParams.get('type') || 'all'

	const createQueryString = useCallback((
		name: string,
		value: string
	) => {
		const params = new URLSearchParams(searchParams.toString())
		params.set(name, value)

		return params.toString()
	}, [searchParams])

	return { pathname, createQueryString, type }
}