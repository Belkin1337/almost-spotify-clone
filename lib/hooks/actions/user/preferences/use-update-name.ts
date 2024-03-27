import { useToast } from "@/lib/hooks/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client";
import { UserGeneric } from "@/types/entities/user";

export type UpdateGeneric = {
  firstName?: string,
  lastName?: string,
  description?: string,
  userId?: string;
  avatarUrl?: any;
};

const supabase = createClient();

export const useUpdateName = () => {
  const { toast } = useToast();

  const uploadUserName = useMutation({
    mutationFn: async (values: UpdateGeneric) => {
      try {
        if (!values.firstName) return null;

        const { data: userName,  error: userErr } = await supabase
          .from("users")
          .update({
            first_name: values.firstName,
            last_name: values.lastName
          })
          .eq("id", values.userId)
          .select()
        
          if (userErr) {
            toast({
              title: userErr.message,
              variant: "red"
            })
          } else if (userName && !userErr) {
            return userName as UserGeneric[];
          }
      } catch (error) {
        toast({
          title: String(error),
          variant: "red"
        })

        return;
      }
    }
  })

  return {
    uploadUserName,
  }
}