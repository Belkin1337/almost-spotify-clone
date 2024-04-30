import { usePlayer } from "@/components/player/hooks/use-player";
import { SongEntity } from "@/types/song";
import { useAudio } from "@/components/player/hooks/use-audio";
import { useHowler } from "@/components/player/hooks/use-howler";

export const useSetActiveSongSongs = () => {
	const { setPlayerAttributes } = usePlayer()
	const { setAudioAttributes } = useAudio();
	const { createHowlInstance } = useHowler();

	const setActive = async (song: SongEntity, songs: SongEntity[], targetSongUrl: string) => {
		createHowlInstance({
			songUrl: targetSongUrl
		}) // создание нового экземпляра аудио по ссылке выбранного трека

		setAudioAttributes.mutate({
			songUrl: targetSongUrl,
		}) // мутирование аттрибута ссылки выбранного трека в стейт

		setPlayerAttributes.mutate({
			active: song, ids: songs,
		});	// мутирование аттрибутов выбранного трека и его массива треков
	}

	return { setActive }
}