"use client"

import { MainPopularLayout } from "@/components/sections/main/components/layout/main-popular-layout";
import { AlbumCard } from "@/components/album/components/card/album-card";
import { useAlbumsAllQuery } from "@/lib/query/album/albums-all-query";

export const MainRecommendationAlbums = () => {
	const { data: albums } = useAlbumsAllQuery();

	if (!albums) return;

	return (
		<MainPopularLayout title="Recommended to you!">
			{albums?.map((album) => (
				<AlbumCard
					key={album.id}
					album={album}
				/>
			))}
		</MainPopularLayout>
	)
}