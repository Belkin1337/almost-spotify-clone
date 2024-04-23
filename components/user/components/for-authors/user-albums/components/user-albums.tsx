"use client"

import { useAlbumsByUser } from "@/lib/query/album/album-by-user";
import { useUserQuery } from "@/lib/query/user/user-query";
import { AlbumCard } from "@/components/album/card/album-card";

export const UserAlbums = () => {
	const { data: user } = useUserQuery();
	const { data: albumsByUser, isError } = useAlbumsByUser(user?.id!)

	return (
		<div className="flex flex-wrap w-full h-full gap-4">
			{albumsByUser?.map(album => (
				<AlbumCard key={album.id} album={album}/>
			))}
		</div>
	)
}