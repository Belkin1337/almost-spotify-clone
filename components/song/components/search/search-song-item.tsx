import { SongImageItem } from "@/components/song/child/song-image/components/song-image";
import { SongItemTitle } from "@/components/song/child/song-title/components/song-title";
import { SongArtist } from "@/components/song/child/song-artist/components/song-artist";
import { SongAlbum } from "@/components/song/child/song-album/components/song-album";
import { SongTitle } from "@/ui/song-title";
import { SongEntity } from "@/types/song";
import { useAlbumBySong } from "@/lib/query/album/album-by-song";
import { SongFollowButton } from "@/components/song/child/song-follow-button/components/song-follow-button";
import { SongDuration } from "@/components/song/child/song-duration/components/song-duration";
import { SongActions } from "@/components/song/child/song-actions/components/song-actions";
import { SongPlayingAttribute } from "@/components/song/child/song-playing-attribute/components/song-playing-attribute";
import { useSongArtistListQuery } from "@/lib/query/song/song-artist-list-query";

export const SearchSongItem = ({
	song,
	song_list
}: {
	song: SongEntity
	song_list: {
		id?: string,
		data?: SongEntity[],
		created_at?: string,
		user_id?: string
	},
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

	if (!song || !artists) return;

	return (
		<div
			className="flex justify-between items-center rounded-md p-2 hover:bg-neutral-700/50 group focus-within:bg-neutral-700 w-full">
			<div className="flex items-center gap-x-4 overflow-hidden w-full">
				<SongPlayingAttribute song={song} id={String(song_list.id)}/>
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
				<div className="flex items-center justify-between w-[110px] gap-x-4 min-w-[100px] overflow-hidden">
					<div className="group-hover:opacity-100 opacity-0">
						<SongFollowButton songId={song.id}/>
					</div>
					<div className="flex items-center justify-between gap-x-2 pr-4">
						<SongDuration duration='0:00'/>
						<SongActions song={song}/>
					</div>
				</div>
			</div>
		</div>
	)
}