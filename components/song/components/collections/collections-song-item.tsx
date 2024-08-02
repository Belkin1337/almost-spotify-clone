import { SongImageItem } from "@/components/song/child/song-image/components/song-image";
import { SongItemTitle } from "@/components/song/child/song-title/components/song-title";
import { SongArtist } from "@/components/song/child/song-artist/components/song-artist";
import { SongAlbum } from "@/components/song/child/song-album/components/song-album";
import { SongTitle } from "@/ui/song-title";
import { SongEntity } from "@/types/song";
import { useAlbumBySong } from "@/lib/query/album/album-by-song";
import { Button } from "@/ui/button";
import { Typography } from "@/ui/typography";
import React, { useCallback } from "react";
import { useAddSongsToPlaylist } from "@/components/forms/playlist/hooks/use-add-songs-to-playlist";
import { PlaylistEntity } from "@/types/playlist";
import { useSongArtistListQuery } from "@/lib/query/song/song-artist-list-query";

export const CollectionsSongItem = ({
	song,
	playlist
}: {
	song: SongEntity,
	playlist: PlaylistEntity
}) => {
	const {
		data: artists,
		isLoading: artistIsLoading,
		isSuccess
	} = useSongArtistListQuery(song.id);
	const {
		data: album,
		isLoading: albumIsLoading
	} = useAlbumBySong(song.id, isSuccess);
	const { addSongsMutation } = useAddSongsToPlaylist()

	const handleAddSongs = useCallback(async () => {
		await addSongsMutation.mutateAsync({
			song: song,
			playlist: playlist
		})
	}, [playlist, song, addSongsMutation])

	if (!artists) return;

	return (
		<div
			className="flex justify-between items-center rounded-md p-2 hover:bg-neutral-700/50 group focus-within:bg-neutral-700 w-full">
			<div className="flex items-center gap-x-3 overflow-hidden w-full">
				<SongImageItem song={song}/>
				<div className="flex flex-col overflow-hidden justify-self-start">
					<SongItemTitle song={song}/>
					<SongArtist
						variant="default"
						artists={artists.artists}
						firstArtist={artists.firstArtist}
						isLoading={artistIsLoading}
					/>
				</div>
			</div>
			<div className={`flex items-center h-full w-full justify-between`}>
				<div className="flex justify-between items-center h-full">
					<div className="w-[190px] overflow-hidden">
						{album?.length! > 0 ? (
							<SongAlbum album={album![0]} isLoading={albumIsLoading}/>
						) : (
							<SongTitle title={song.title} variant="player" className="text-neutral-400"/>
						)}
					</div>
				</div>
			</div>
			<Button
				align="centered"
				rounded="full"
				onClick={handleAddSongs}
				className="px-4 py-1 group border hover:scale-[1.04] hover:border-white border-neutral-500"
			>
				<Typography size="small" font="normal">
					Add
				</Typography>
			</Button>
		</div>
	)
}