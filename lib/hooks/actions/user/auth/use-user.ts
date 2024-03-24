import { createClient } from "@/lib/utils/supabase/client";
import { UserGeneric } from "@/types/entities/user";
import { QueryClient, QueryFunction, QueryKey, useQuery } from "@tanstack/react-query";

const supabase = createClient();

const queryClient = new QueryClient();

const fetchUser = async () => {
  const { data: userSession } = await supabase.auth.getSession();

  if (userSession.session?.user) {
    const { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("id", userSession.session?.user.id)
      .single();

    return user as UserGeneric;
  }
};

const queryKey: QueryKey = ["user"];
const queryFn = fetchUser as QueryFunction<UserGeneric, QueryKey, never>;

export const useUser = () => {
  const { data: user } = useQuery<UserGeneric, Error>({
    queryKey: queryKey,
    queryFn: queryFn,
    initialData: () => {
      const cachedData = queryClient.getQueryData<UserGeneric>(queryKey);
      
      if (cachedData) {
        return cachedData;
      } else {
        fetchUser();
      }
    },
    staleTime: 60000
  });

  return { 
    user 
  };
};