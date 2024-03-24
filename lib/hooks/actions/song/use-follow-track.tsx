"use client"

import { createClient } from "@/lib/utils/supabase/client";
import { useUser } from "../user/auth/use-user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFollowSong } from "@/lib/queries/get-follow-song";
import { useToast } from "../../ui/use-toast";
import { useScopedI18n } from "@/locales/client";
import { ToastAction } from "@/ui/toast";
import Image from "next/image";

const supabase = createClient();

export type FollowedSong = {
  user_id: string,
  song_id: string,
  created_at: string
}

export function useFollowSong(songId: string) {
  const { user } = useUser();
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const likeButtonLocale = useScopedI18n('main-service.main-part.config')

  const getFollowedSong = async () => {
    if (user && songId) {
      const response = await getFollowSong(supabase, songId, user.id);

      return response;
    }

    return;
  };

  const { 
    data: followedSong, 
    refetch 
  } = useQuery({
    queryKey: ['followedSong', user?.id, songId],
    queryFn: getFollowedSong
  });

  const variantToast = {
    message: followedSong?.data?.song_id
      ? likeButtonLocale('toast.remove-liked-songs')
      : likeButtonLocale('toast.add-liked-songs'),
    variant: followedSong?.data?.song_id
      ? "red" as "red"
      : "right" as "right"
  }

  const followMutation = useMutation({
    mutationFn: async () => {
      try {
        if (followedSong?.data?.song_id === songId) {
          await supabase
            .from('liked_songs')
            .delete()
            .eq('user_id', user?.id)
            .eq('song_id', songId);
        } else {
          await supabase
            .from('liked_songs')
            .insert({
              song_id: songId,
              user_id: user?.id
            });
        }

        refetch();
      } catch (error) {
        toast({
          title: String(error)
        })
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["followedSong", user?.id, songId]
      })

      queryClient.invalidateQueries({
        queryKey: [
          'postgrest',
          'null',
          'public',
          'liked_songs',
          `order=created_at.desc&select=*%2Csongs%28*%29&user_id=eq.${user?.id}`,
          'null',
          'count=null',
          'head=false',
          'created_at:desc.nullsLast'
        ],
      })

      toast({
        title: variantToast.message,
        variant: variantToast.variant,
        action:
          <ToastAction
            altText={`${variantToast.message}`}
            className="rounded-md p-0 overflow-hidden h-[36px] w-[36px]">
            <Image
              src="/images/liked.png"
              width={36}
              height={36}
              alt={`${variantToast.message}`}
            />
          </ToastAction>
      });
    },

    onError: (error: Error) => {
      toast({
        title: error.message,
        variant: "red",
      });
    },
  })

  return {
    followedSong,
    followMutation,
  }
}