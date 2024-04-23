import { usePreviewSong } from "@/components/forms/song/hooks/use-preview-song";
import { SongEntity } from "@/types/song";
import { useSongArtistListQuery } from "@/lib/query/song/song-artist-list-query";
import { useLoadImage } from "@/lib/hooks/image/use-load-image";

export const useSongPreviewState = ({
	song,
	type
}: {
	song: SongEntity | undefined,
	type: "create" | "edit"
}) => {
	const { data: songImage } = useLoadImage(song?.image_path || '');
	const { data: artists } = useSongArtistListQuery(song?.id || '');

	const {
		songPreviewState,
		setSongPreviewAttributes
	} = usePreviewSong({
		title: song ? song.title : '',
		genre: song ? song.genre : null,
		image: song ? songImage?.url : '',
		artists: song ? type === 'create' ? [] : artists?.artists! : [],
		credits: []
	});

	return { songPreviewState, setSongPreviewAttributes }
}