"use client"

import { useScopedI18n } from "@/locales/client";
import { useAlbumsAllQuery } from "@/lib/query/album/albums-all-query";
import { AlbumCard } from "@/components/album/card/album-card";

export const MainTracksList = () => {
	const { data: albums } = useAlbumsAllQuery();

	const mainSongContentLocale = useScopedI18n('main-service.pages.main-content')

	return (
		albums ? (
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4">
				{albums?.map((album) => (
					<AlbumCard
						key={album.id}
						album={album}
					/>
				))}
			</div>
		) : (
			<div className="text-neutral-400">
				{mainSongContentLocale('navbar.no-available-tracks')}
			</div>
		)
	)
}