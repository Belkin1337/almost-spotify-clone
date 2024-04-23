import { useDialog } from "../ui/use-dialog";
import { AuthForm } from "@/components/forms/auth/components/auth-form";
import { SongEntity } from "@/types/song";
import { useCallback } from "react";
import { useAudio } from "@/components/player/hooks/use-audio";
import { useHowler } from "@/components/player/hooks/use-howler";
import { useAudioStateQuery } from "@/lib/query/player/audio-state-query";
import { usePlayer } from "@/components/player/hooks/use-player";
import { useUserQuery } from "@/lib/query/user/user-query";
import { getSongUrl } from "@/lib/queries/song/single/get-song-url";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { useUnloadHowl } from "@/lib/hooks/player/use-unload-howl";

const supabase = createClient();



//
//
//
//
//
//
//
//
//
//
//


export const usePlay = () => {
	const { data: user } = useUserQuery();
	const { audioAttributes } = useAudioStateQuery()
	const { setAudioAtrributes } = useAudio();
	const { setPlayerAttributes } = usePlayer()
	const { createHowlInstance } = useHowler();
	const { openDialog } = useDialog();
	const { unload } = useUnloadHowl()

 	const onPlay = useCallback(async ({
		song,
		songs
	}: {
		song: SongEntity,
		songs: SongEntity[]
	}) => {
		if (!user) {
			openDialog({
				dialogChildren: <AuthForm/>
			})
		} else {
			const { data } = await getSongUrl(supabase, song?.song_path);
			const songUrl = data.publicUrl;

			if (audioAttributes?.songUrl !== songUrl) {
				if (songUrl) {
					unload();

					createHowlInstance({
						songUrl: songUrl
					})

					setPlayerAttributes.mutate({
						active: song,
						ids: songs,
					});

					setAudioAtrributes.mutate({
						songUrl: songUrl,
					})
				}
			} else {
				unload();

				createHowlInstance({
					songUrl: songUrl
				})
			}
		}
	}, [
		user,
		audioAttributes?.songUrl,
		createHowlInstance,
		openDialog,
	])

	return {
		onPlay
	}
}