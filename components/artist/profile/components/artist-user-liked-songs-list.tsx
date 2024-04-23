"use client"

import { useUserFollowedSongsByArtist } from "@/components/artist/profile/hooks/use-user-followed-songs-by-artist";
import { SongItem } from "@/components/song/song-item/song-item";
import { Typography } from "@/ui/typography";
import { useArtistQuery } from "@/lib/query/artist/artist-query";
import { SongListTableHead } from "@/ui/song-list-table-head";

export const ArtistUserLikedSongsList = ({
	artistId
}: {
	artistId: string
}) => {
	const { data: artist } = useArtistQuery(artistId);
	const { followedSongs, isLoading } = useUserFollowedSongsByArtist(artistId)

	if (!followedSongs || !artist) return null;

	return (
		<div className="flex flex-col gap-y-6">
			<div className="flex p-6">
				<Typography variant="page_title">
					Liked songs by {artist.name}
				</Typography>
			</div>
			<div className="flex flex-col gap-y-1">
				<SongListTableHead/>
				<div className="flex flex-col gap-y-2 w-full p-6">
					{followedSongs.map((song,
						idx) => (
						<SongItem
							key={song.id}
							song={song}
							isLoading={isLoading}
							song_list={{
								data: followedSongs,
								id: String(idx + 1)
							}}
						/>
					))}
				</div>
			</div>
		</div>
	)
}