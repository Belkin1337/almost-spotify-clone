"use client"

import { MainPopularLayout } from "@/components/sections/main/components/layout/main-popular-layout";
import { useGridControl } from "@/lib/hooks/ui/use-grid-control";

export const MainPopularAlbums = () => {
	const { sliceSize } = useGridControl()

	return (
		<MainPopularLayout title="Popular Albums">
			...
		</MainPopularLayout>
	)
}