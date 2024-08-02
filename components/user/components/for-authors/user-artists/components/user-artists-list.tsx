"use client"

import { ArtistCard } from "@/components/artist/components/card/components/artist-card";
import { ArtistEditSubMenu } from "@/components/forms/artist/components/artist-edit-sub-menu";
import { useUserArtistListQuery } from "@/lib/query/user/user-artists-list-query";
import { SongPlayingBar } from "@/ui/song-playing-bar";

export const UserArtistsList = ({
	userId
}: {
	userId: string
}) => {
	const { data: artists, isError: artistsError, isPending } = useUserArtistListQuery(userId)

	if (artistsError || !userId) return;

	return (
		<div className="flex flex-wrap w-full h-full gap-4">
			{isPending && (
				<SongPlayingBar />
			)}
			{artists?.map((artist) => (
				<ArtistCard variant="list" key={artist.id} artist={artist}>
					<ArtistEditSubMenu artist={artist}/>
				</ArtistCard>
			))}
		</div>
	)
}