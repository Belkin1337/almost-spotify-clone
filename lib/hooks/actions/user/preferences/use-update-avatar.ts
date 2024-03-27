import { createClient } from "@/lib/utils/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { useUser } from "../auth/use-user";
import { UpdateGeneric } from "./use-update-name";

const supabase = createClient();

export const useUpdateAvatar = () => {
  const { user } = useUser();
  
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const uploadFile = useMutation({
    mutationFn: async (values: UpdateGeneric) => {
      try {
        if (!values.avatarUrl || !values.userId) return null;

        const { data: userAvatar, error: uploadError } = await supabase.storage
          .from("users")
          .upload(`${values.userId}-avatar`, values.avatarUrl, {
            upsert: true,
            contentType: "fileBody",
          });

        if (uploadError) {
          toast({
            title: uploadError.message,
            variant: "red"
          });
        } else {
          return userAvatar;
        }
      } catch (error) {
        toast({
          title: String(error),
          variant: "red"
        });

        return;
      }
    },
  });

  const uploadAvatar = useMutation({
    mutationFn: async (values: UpdateGeneric) => {
      const [userData] = await Promise.all([
        uploadFile.mutateAsync(values),
      ]);

      if (userData !== null) {
        try {
          const { data: newAvatar, error: userError } = await supabase
            .from("users")
            .update({
              avatar_url: userData?.path,
            })
            .eq("id", values.userId)
            .select();

          if (userError) return;
          
          return newAvatar;
        } catch (error) {
          toast({
            title: String(error),
            variant: "red",
          });

          return;
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${user?.id}-avatar`],
      });
    },
  });

  return {
    uploadAvatar,
  };
};