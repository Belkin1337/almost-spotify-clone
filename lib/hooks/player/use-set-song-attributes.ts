import { useCallback } from "react";
import { SongEntity } from "@/types/song";
import { getSongUrl } from "@/lib/queries/song/single/get-song-url";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { usePlayer } from "@/components/player/hooks/use-player";
import { useAudio } from "@/components/player/hooks/use-audio";
import { useHowler } from "@/components/player/hooks/use-howler";
import { useUserQuery } from "@/lib/query/user/user-query";

const supabase = createClient();

type NewSongAttributesType = {
	nextSong: SongEntity,
	nextSongArray: SongEntity[]
}

export const useSetSongAttributes = () => {
	const { data: user } = useUserQuery()
	const { setPlayerAttributes } = usePlayer();
	const { setAudioAttributes } = useAudio();
	const { createHowlInstance } = useHowler()

	const setNewSongAttributes = useCallback(async ({
		nextSong,
		nextSongArray
	}: NewSongAttributesType) => {
		if (user) {
			const { data } = await getSongUrl(supabase, nextSong?.song_path);
			const songUrl = data.publicUrl;

			createHowlInstance({ songUrl: songUrl })
			setPlayerAttributes.mutate({ active: nextSong, ids: nextSongArray })
			setAudioAttributes.mutate({ songUrl: songUrl, })
		} else {
			return null;
		}
	}, [setAudioAttributes, setPlayerAttributes])

	return { setNewSongAttributes }
}