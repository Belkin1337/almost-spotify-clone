import { createClient } from "@/lib/utils/supabase/client";
import { useSuspenseQuery } from "@tanstack/react-query";

const supabase = createClient();

export const useLoadUserAvatar = (userId: string) => {
  return useSuspenseQuery({
    queryKey: [userId],
    queryFn: () => {
      const { data: userAvatar } = supabase
        .storage
        .from('users')
        .getPublicUrl(`${'user-' + userId + '-avatar'}`)

      if (userAvatar.publicUrl === 'https://huhpmogbdpibjlquvuli.supabase.co/storage/v1/object/public/users/user-undefined-avatar') {
        return '';
      } else {
        return userAvatar.publicUrl;
      }
    },
    retry: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true
  })
}