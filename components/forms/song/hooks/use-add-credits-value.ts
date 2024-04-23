import { useRolesQuery } from "@/lib/query/roles/roles-query";
import { useSongPreviewState } from "@/components/forms/song/hooks/use-song-preview-state";
import { useCallback, useEffect } from "react";
import { ArtistEntity } from "@/types/artist";
import { RoleType } from "@/types/role";

export const useAddCreditsValue = () => {
	const { data: roles } = useRolesQuery();

	const {
		songPreviewState,
		setSongPreviewAttributes
	} = useSongPreviewState({
		song: undefined,
		type: "create"
	});

	const creditsLength = songPreviewState?.credits?.length || 0;
	const artistsLength = songPreviewState?.artists?.length || 0;

	useEffect(() => {
		if (artistsLength !== creditsLength) {
			const newCredits = [...songPreviewState?.credits!];

			if (artistsLength > creditsLength) {
				const diff = artistsLength - creditsLength;

				for (let i = 0; i < diff; i++) {
					newCredits.push({
						artist: songPreviewState.artists![creditsLength + i], role: null
					});
				}
			} else newCredits.splice(artistsLength);

			setSongPreviewAttributes.mutate({
				...songPreviewState,
				credits: newCredits
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [artistsLength]);

	const handleCreditsValues = useCallback(({
		artist,
		role,
		index
	}: {
		artist?: ArtistEntity;
		role?: RoleType,
		index: number
	}) => {
		const currentArtist = songPreviewState?.credits?.[0]?.artist;
		const currentRole = songPreviewState?.credits?.[0]?.role;

		const updatedArtist = artist || currentArtist;
		const updatedRole = role || currentRole;

		if (songPreviewState.credits) {
			const artistExists = songPreviewState.credits.some(
				(credit) => credit.artist === updatedArtist);
			const roleExists = songPreviewState.credits.some(
				(credit) => credit.role === updatedRole);

			if (artistExists && roleExists) return;

			const updatedCredits = [...songPreviewState.credits];

			if (role) {
				updatedCredits[index] = {
					...updatedCredits[index],
					role: role || null,
				};
			} else if (artist) {
				updatedCredits[index] = {
					...updatedCredits[index],
					artist: artist || null,
				};
			}

			setSongPreviewAttributes.mutate({
				...songPreviewState,
				credits: updatedCredits,
			});
		}
	}, [songPreviewState, setSongPreviewAttributes]);

	const deleteCreditItem = useCallback((
		artist: ArtistEntity
	) => {
		if (artist && songPreviewState.credits) {
			const updatedCredits = songPreviewState.credits.filter(
				item => item.artist?.id !== artist.id
			);

			setSongPreviewAttributes.mutate({
				credits: updatedCredits
			});
		}
	}, [setSongPreviewAttributes, songPreviewState?.credits]);

	return { handleCreditsValues, deleteCreditItem, creditsLength, roles, songPreviewState }
}