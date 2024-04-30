"use client"

import { Badge } from "@/ui/badge";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { Typography } from "@/ui/typography";
import {
	MAIN_PAGE_SORT_LIST,
	MainSortType,
	useMainPageSort
} from "@/components/sections/main/components/sort/hooks/use-main-page-sort";

export const MainPageSort = () => {
	const { push } = useRouter();
	const { pathname, type, createQueryString } = useMainPageSort()

	const getBadgeType = useCallback((sortType: MainSortType) => {
		return type === sortType ? "active" : "no_active";
	}, [type])

	return (
		<div className="flex items-center gap-x-2">
			{MAIN_PAGE_SORT_LIST.map(item => (
				<Badge
					key={item.name}
					type={getBadgeType(item.name.toLowerCase() as MainSortType)}
					onClick={() => {
						if (item.name.toLowerCase() !== 'all') {
							push(pathname + '?' + createQueryString(
								'type',
								item.name.toLowerCase())
							)
						} else {
							push(pathname);
						}
					}}
				>
					<Typography className="capitalize">
						{item.name}
					</Typography>
				</Badge>
			))}
		</div>
	)
}