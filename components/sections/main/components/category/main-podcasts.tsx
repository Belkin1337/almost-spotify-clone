"use client"

import { useSearchParams } from "next/navigation";

export const MainPodcasts = () => {
	const search = useSearchParams();
	const type = search.get("type");

	if (type !== 'podcasts' && type !== null) return null;

	return (
		<div>
			...podcasts
		</div>
	)
}