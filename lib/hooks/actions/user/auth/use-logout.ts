import { useToast } from "@/lib/hooks/ui/use-toast";
import { createClient } from "@/lib/utils/supabase/client";
import { useScopedI18n } from "@/locales/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "./use-user";

const supabase = createClient();

export function useLogout() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navbarLocale = useScopedI18n("main-service.main-part.config");

  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();

      if (error) { 
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.clear()
    }
  });
}