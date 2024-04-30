import { SongShuffleButton } from "@/components/song/child/song-shuffle-button/components/song-shuffle-button";
import { ArtistPlayButton } from "@/components/artist/components/profile/components/artist-play-button";
import { AlbumFollowButton } from "@/components/album/child/album-follow/album-follow-button";
import { AlbumEntity } from "@/types/album";
import { useAlbumSongsQuery } from "@/lib/query/album/album-songs-query";

export const AlbumToolsBar = ({
	album
}: {
	album: AlbumEntity
}) => {
	const { data: songs, isError } = useAlbumSongsQuery(album.id);

	if (!songs || isError) return;

	return (
		<div className="flex items-center gap-x-10 px-6 py-4">
			<ArtistPlayButton song_list={songs}/>
			<div className="flex items-center gap-x-4">
				<SongShuffleButton/>
				<AlbumFollowButton/>
			</div>
		</div>
	)
}