import { useToast } from "@/lib/hooks/ui/use-toast";
import { createClient } from "@/lib/utils/supabase/client";
import { useScopedI18n } from "@/locales/client";
import { ToastAction } from "@/ui/toast";
import { useUser } from "../user/auth/use-user";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";

const supabase = createClient()

export function useFollowSong(songId: string) {
  const { data: user } = useUser()
  const { toast } = useToast()
  const likeButtonLocale = useScopedI18n('main-service.main-part.config');

  const followTrack = useMutation({
    mutationFn: async () => {
      if (user) {
        const raw_song = {
          createdf: Date.now(),
          id: songId
        }

        const { data, error } = await supabase
          .from('users')
          .insert([{
            id: user.id,
            followed_songs: [raw_song]
          }])
          .eq('user_id', user.id)
          .eq('song_id', songId)

        if (error) {
          toast({
            title: error.message,
            variant: "red"
          })
        }

        if (!error) {
          toast({
            title: likeButtonLocale('toast.add-liked-songs'),
            variant: "right",
            action:
              <ToastAction
                altText="Song liked!"
                className="rounded-md p-0 overflow-hidden h-[36px] w-[36px]"
              >
                <Image
                  src="/images/liked.png"
                  width={36}
                  height={36}
                  alt="Song added to followed"
                />
              </ToastAction>
          });
        }
      }
    }
  })

  return followTrack
}