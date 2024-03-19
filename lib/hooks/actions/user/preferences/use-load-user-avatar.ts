import { storage_users } from "@/lib/constants/routes";
import { createClient } from "@/lib/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

const supabase = createClient();

export const useLoadUserAvatar = (userId: string) => {
  return useQuery({
    queryKey: [`${userId}-avatar`],
    queryFn: () => {
      const { data: avatar } = supabase
        .storage
        .from('users')
        .getPublicUrl(`${userId}-avatar`)

      if (avatar.publicUrl === `${storage_users}/undefined-avatar`) {
        return "/images/null-avatar.png"
      } else {
        return avatar.publicUrl;
      }
    },
  })
}