import { useMutation } from "@tanstack/react-query";
import { createClient } from "../../../utils/supabase/client";
import { useUser } from "../user/auth/use-user";
import { ToastAction } from "@/ui/toast";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { useScopedI18n } from "@/locales/client";
import Image from "next/image";

const supabase = createClient();

export function useDeleteFollowSong(songId: string) {
  const { data: user } = useUser();
  const { toast } = useToast()
  const likeButtonLocale = useScopedI18n('main-service.main-part.config');

  const deleteTrack = useMutation({
    mutationFn: async () => {
      if (user) {
        const { error } = await supabase
          .from('liked_songs')
          .select("*")
          .eq("user_id", user.id)
          .eq("song_id", songId)
          .single();

        if (error) {
          toast({
            title: `${error}`,
            variant: "red"
          })
        }

        if (!error) {
          toast({
            title: likeButtonLocale('toast.remove-liked-songs'),
            variant: "red",
            action:
              <ToastAction
                altText="Song liked!"
                className="rounded-md p-0 overflow-hidden h-[36px] w-[36px]"
              >
                <Image
                  src="/images/liked.png"
                  width={36}
                  height={36}
                  alt="Song removed from followed"
                />
              </ToastAction>
          });
        }
      }
    },
  });

  return deleteTrack
}
