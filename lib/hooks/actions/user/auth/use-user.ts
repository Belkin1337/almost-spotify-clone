import { createClient } from "@/lib/utils/supabase/client";
import { UserGeneric } from "@/types/entities/user";
import { useQuery } from "@tanstack/react-query";

const supabase = createClient();

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data: userSession } = await supabase.auth.getSession();

      if (userSession.session?.user) {
        const { data: user } = await supabase
          .from("users")
          .select("*")
          .eq("id", userSession.session?.user.id)
          .single();

        return user as UserGeneric;
      }
    },
  });
};