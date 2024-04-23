import { useCallback, useState } from "react";
import { Howler } from "howler"
import { useVolumeStateQuery, VolumeAttributeType } from "@/lib/query/player/volume-state-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { volumeStateQueryKey } from "@/lib/querykeys/player-state";

export const useVolume = () => {
  const [prevVolume, setPrevVolume] = useState<number>(1);
  const { volumeAttribute } = useVolumeStateQuery()

  const queryClient = useQueryClient()

  const setVolumeAttribute = useMutation({
    mutationFn: async (
      newAttribute: VolumeAttributeType
    ) => {
      return queryClient.setQueryData<VolumeAttributeType>(
        volumeStateQueryKey,
        (prev) => {
          return {
            ...prev,
            ...newAttribute
          }
        }
      )
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: volumeStateQueryKey
      });
    }
  })

  const volume = volumeAttribute?.volume;

  const setVolume = useCallback((
    newVolume: number
  ) => {
    setVolumeAttribute.mutate({
      volume: newVolume
    })

    Howler.volume(newVolume)
  }, [setVolumeAttribute]);

  const mute = useCallback(() => {
    setPrevVolume(volume || 1);
    setVolume(0);
  }, [setVolume, volume]);

  const unmute = useCallback(() => {
    setVolume(prevVolume);
  }, [setVolume, prevVolume]);

  return { 
    volume,
    setVolume,
    mute, 
    unmute
  };
};