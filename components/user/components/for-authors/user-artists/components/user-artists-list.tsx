"use client"

import { useUserQuery } from "@/lib/query/user/user-query"
import { ArtistCard } from "@/components/artist/card/components/artist-card";
import { ArtistEditSubMenu } from "@/components/forms/artist/components/artist-edit-sub-menu";
import { useUserArtistListQuery } from "@/lib/query/user/user-artists-list-query";
import { ItemLoader } from "@/ui/item-loader";

export const UserArtistsList = () => {
	const { data: user } = useUserQuery();
	const { data: artists, isError: artistsError, isPending } = useUserArtistListQuery(user?.id!)

	if (artistsError || !user) return;

	return (
		<div className="flex flex-wrap w-full h-full gap-4">
			{isPending && (
				<ItemLoader />
			)}
			{artists?.map((artist) => (
				<ArtistCard variant="list" key={artist.id} artist={artist}>
					<ArtistEditSubMenu artist={artist}/>
				</ArtistCard>
			))}
		</div>
	)
}