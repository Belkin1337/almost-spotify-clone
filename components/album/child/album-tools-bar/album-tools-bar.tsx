import { SongShuffleButton } from "@/components/song/child/song-shuffle-button/components/song-shuffle-button";
import { ArtistPlayButton } from "@/components/artist/components/profile/components/artist-play-button";
import { AlbumFollowButton } from "@/components/album/child/album-follow/album-follow-button";
import { useAlbumSongsQuery } from "@/lib/query/album/album-songs-query";
import { AlbumItemProps } from "@/components/album/types/album-types";

export const AlbumToolsBar = ({
	album
}: AlbumItemProps) => {
	const { data: songs, isError } = useAlbumSongsQuery(album.id);

	if (!songs || isError) return;

	return (
		<div className="flex items-center gap-x-10 px-6 py-4">
			<ArtistPlayButton songList={songs}/>
			<div className="flex items-center gap-x-4">
				<SongShuffleButton/>
				<AlbumFollowButton/>
			</div>
		</div>
	)
}