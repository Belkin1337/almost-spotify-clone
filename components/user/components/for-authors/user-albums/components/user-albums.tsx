"use client"

import { useAlbumsByUser } from "@/lib/query/album/album-by-user";
import { AlbumCard } from "@/components/album/components/card/album-card";

export const UserAlbums = ({
	userId
}: {
	userId: string
}) => {
	const { data: albumsByUser, isError } = useAlbumsByUser(userId)

	if (!userId) return;

	return (
		<div className="flex flex-wrap w-full h-full gap-4">
			{albumsByUser?.map(album => (
				<AlbumCard key={album.id} album={album}/>
			))}
		</div>
	)
}