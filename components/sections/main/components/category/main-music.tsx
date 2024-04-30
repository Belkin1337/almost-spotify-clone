"use client"

import {
	MainRecommendationAlbums
} from "@/components/sections/main/components/lists/recommendations/main-recommendation-albums";
import {
	MainRecommendationArtists
} from "@/components/sections/main/components/lists/recommendations/main-recommendation-artists";
import { useSearchParams } from "next/navigation";

export const MainMusic = () => {
	const search = useSearchParams();
	const type = search.get("type");

	if (type !== 'music' && type !== null) return null;

	return (
		<>
			<MainRecommendationAlbums/>
			<MainRecommendationArtists/>
		</>
	)
}