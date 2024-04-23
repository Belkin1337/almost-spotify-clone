import { useCallback } from "react";
import { SongEntity } from "@/types/song";
import { getSongUrl } from "@/lib/queries/song/single/get-song-url";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { usePlayer } from "@/components/player/hooks/use-player";
import { useAudio } from "@/components/player/hooks/use-audio";
import { useUnloadHowl } from "@/lib/hooks/player/use-unload-howl";
import { useHowler } from "@/components/player/hooks/use-howler";

const supabase = createClient();

export const useSetSongAttributes = () => {
	const { setPlayerAttributes } = usePlayer();
	const { setAudioAtrributes } = useAudio();
	const { unload } = useUnloadHowl()
	const { createHowlInstance } = useHowler()

	const setNewSongAttributes = useCallback(async ({
		nextSong,
		nextSongArray,
	}: {
		nextSong: SongEntity,
		nextSongArray: SongEntity[]
	}) => {
		const { data } = await getSongUrl(supabase, nextSong?.song_path);
		const songUrl = data.publicUrl;

		unload()

		createHowlInstance({
			songUrl: songUrl
		})

		setPlayerAttributes.mutate({
			active: nextSong,
			ids: nextSongArray
		})

		setAudioAtrributes.mutate({
			songUrl: songUrl,
		})
	}, [setAudioAtrributes, setPlayerAttributes])

	return { setNewSongAttributes }
}