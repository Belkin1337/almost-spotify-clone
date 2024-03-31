import { createClient } from "@/lib/utils/supabase/client";
import { UserGeneric } from "@/types/entities/user";
import { useQuery } from "@tanstack/react-query";

const supabase = createClient();

export const useUser = () => {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data: userSession, error } = await supabase.auth.getUser();

      if (userSession.user && !error) {
        const { data: user } = await supabase
          .from("users")
          .select("*")
          .eq("id", userSession.user?.id)
          .single();
    
        return user as UserGeneric;
      }
    },
    refetchOnMount: true,
    staleTime: 0
  })

  return { user }
};