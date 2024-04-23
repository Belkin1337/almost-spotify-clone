"use client"

import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { UserEntity } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { userQueryKey } from "@/lib/querykeys/user";

const supabase = createClient();

export const useUserQuery = () => {
  return useQuery({
    queryKey: userQueryKey,
    queryFn: async () => {
      const { data: userSession, error } = await supabase.auth.getUser();

      if (userSession.user && !error) {
        const { data } = await supabase
          .from("users")
          .select("*")
          .eq("id", userSession.user?.id)
          .single();

        const user = data as UserEntity;

        return user
      }
    },
  })
};