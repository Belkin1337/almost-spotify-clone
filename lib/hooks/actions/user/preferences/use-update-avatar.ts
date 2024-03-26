import { createClient } from "@/lib/utils/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { useRouter } from "next/navigation";
import { useUser } from "../auth/use-user";
import { UpdateGeneric } from "./use-update-name";

const supabase = createClient();

export const useUpdateAvatar = () => {
  const { user } = useUser();
  
  const queryClient = useQueryClient();

  const { toast } = useToast();
  const { refresh } = useRouter();
  const { closeDialog } = useDialog();

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
          toast({
            title: "Аватар обновлен!",
            variant: "right"
          });

          return userAvatar;
        }
      } catch (error) {
        toast({
          title: String(error),
          variant: "red"
        });
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
          const { error: userError } = await supabase
            .from("users")
            .update({
              avatar_url: userData?.path,
            })
            .eq("id", values.userId)
            .select();

          if (userError) return;
        } catch (error) {
          toast({
            title: String(error),
            variant: "red",
          });
        }
      }
    },
    onSuccess: () => {
      closeDialog();
      refresh();

      queryClient.invalidateQueries({
        queryKey: [`${user?.id}-avatar`],
      });
    },
  });

  return {
    uploadAvatar,
  };
};