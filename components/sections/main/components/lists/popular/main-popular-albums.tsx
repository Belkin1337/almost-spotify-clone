"use client"

import { MainPopularLayout } from "@/components/sections/main/components/layout/main-popular-layout";
import { useGrid } from "@/lib/hooks/ui/use-grid";

export const MainPopularAlbums = () => {
	const { rows } = useGrid()

	return (
		<MainPopularLayout title="Popular Albums">
			...
		</MainPopularLayout>
	)
}