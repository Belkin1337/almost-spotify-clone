"use client"

import { useArtistsOrderByFollowers } from "@/lib/query/artist/artists-order-by-followers";
import { ArtistCard } from "@/components/artist/components/card/components/artist-card";
import { memo } from "react";
import { MainPopularLayout } from "@/components/sections/main/components/layout/main-popular-layout";
import { useGridControl } from "@/lib/hooks/ui/use-grid-control";

export const MainPopularArtists = memo(() => {
	const { data: popularArtists } = useArtistsOrderByFollowers();
	const { sliceSize } = useGridControl()

	if (!popularArtists) return;

	return (
		<MainPopularLayout title="Popular Artists">
			{popularArtists.slice(0, sliceSize).map(artist => (
				<ArtistCard
					key={artist.id}
					artist={artist}
					variant="search"
				/>
			))}
		</MainPopularLayout>
	)
})

MainPopularArtists.displayName = "MainPopularArtists";