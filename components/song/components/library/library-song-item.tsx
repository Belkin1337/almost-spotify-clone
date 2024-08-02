import { ISongItem } from "@/components/song/types/song-item-types";
import { SongPlayingAttribute } from "@/components/song/child/song-playing-attribute/components/song-playing-attribute";
import { SongImageItem } from "@/components/song/child/song-image/components/song-image";
import { SongItemTitle } from "@/components/song/child/song-title/components/song-title";
import { SongArtist } from "@/components/song/child/song-artist/components/song-artist";
import { AiFillSound } from "react-icons/ai";
import { useCallback } from "react";
import { album_route, song_route } from "@/lib/constants/routes/routes";
import { useRouter } from "next/navigation";
import { useAlbumBySong } from "@/lib/query/album/album-by-song";
import { usePlay } from "@/lib/hooks/player/use-play";
import { usePlayerStateQuery } from "@/lib/query/player/player-state-query";
import { useSongArtistListQuery } from "@/lib/query/song/song-artist-list-query";

export const LibrarySongItem = ({
	song,
	song_list
}: ISongItem) => {
	const { push } = useRouter();
	const {
		data: artists,
		isLoading: artistIsLoading,
		isSuccess
	} = useSongArtistListQuery(song.id);
	const {
		data: album,
		isLoading: albumIsLoading
	} = useAlbumBySong(song.id, isSuccess);
	const { onPlay } = usePlay();
	const { playerAttributes } = usePlayerStateQuery()

	const handlePlay = useCallback(async () => {
		await onPlay({
			song: song,
			songs: song_list.data ? song_list.data : (playerAttributes?.ids ? playerAttributes.ids : [])
		})
	}, [onPlay, playerAttributes.ids, song, song_list.data])

	const handleClickLibrary = useCallback(async (
		e: React.MouseEvent<HTMLElement>
	) => {
		switch (e.detail) {
			case 1: {
				if (album?.length! > 0) {
					push(album_route(album![0].id));
				} else push(song_route(song?.id))

				break;
			}
			case 2: {
				await handlePlay();
				break;
			}
		}
	}, [push, album, song?.id, handlePlay])

	const handleClickFollowed = useCallback(async () => {
		await handlePlay()
	}, [handlePlay])

	if (!song || !artists) return;

	return (
		<div
			onClick={handleClickLibrary}
			onDoubleClick={handleClickFollowed}
			className="flex justify-between items-center rounded-md p-2 hover:bg-neutral-700/50 cursor-pointer group min-h-[66px] w-full overflow-hidden"
		>
			<div className={`flex items-center gap-x-2 overflow-hidden w-full`}>
				<SongPlayingAttribute
					song={song}
					id={String(song_list.id)}
				/>
				<SongImageItem
					song={song}
					variant={"follow"}
				/>
				<div className="flex flex-col overflow-hidden justify-self-start">
					<SongItemTitle
						song={song}
						className={`${playerAttributes?.isPlaying && playerAttributes?.active?.id === song.id && '!text-jade-500'}`}
					/>
					<SongArtist
						variant="default"
						artists={artists.artists}
						firstArtist={artists.firstArtist}
						isLoading={artistIsLoading}
					/>
				</div>
				{playerAttributes?.isPlaying && playerAttributes?.active?.id === song.id && (
					<div className="w-[24px] h-[24px] ml-4">
						<AiFillSound size={18} className="text-jade-500"/>
					</div>
				)}
			</div>
		</div>
	)
}