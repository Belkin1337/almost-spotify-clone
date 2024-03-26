"use client"

import { useToast } from "@/lib/hooks/ui/use-toast";
import { createClient } from "@/lib/utils/supabase/client";
import { useScopedI18n } from "@/locales/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const supabase = createClient();

const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
};

export function useLogout() {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const navbarLocale = useScopedI18n("main-service.main-part.config");

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries();

      toast({
        title: navbarLocale("toast.log-out"),
        variant: "right"
      });
    },
  });
}