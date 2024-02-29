import { createClient } from "@/lib/utils/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const supabase = createClient();

const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
};

export function useLogout() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries();
    },
  });
}