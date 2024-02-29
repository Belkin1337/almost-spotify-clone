import { createClient } from "@/lib/utils/supabase/client";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { UpdateGeneric } from "@/types/form/profile";
import unique from "uniqid"

const supabase = createClient();

export const useUpdateAvatar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const uniqueID = unique()

  const uploadAvatarFile = useMutation({
    mutationFn: async (values: UpdateGeneric) => {
      try {
        if (!values.avatarUrl || !values.userId) return null;

        const { data: userAvatar, error: userError } = await supabase
          .storage
          .from("users")
          .upload(`user-${values.userId}-avatar-${uniqueID}`, values.avatarUrl, {
            upsert: true,
            contentType: "fileBody"
          });

        if (userError) {
          toast({
            title: userError.message,
          });
        } else {
          toast({
            title: "Аватар обновлен!",
          });

          return userAvatar;
        }
      } catch (error) {
        toast({
          title: String(error)
        })
      }
    },
  });

  const uploadAvatar = useMutation({
    mutationFn: async (values: UpdateGeneric) => {
      const [userData] = await Promise.all([
        uploadAvatarFile.mutateAsync(values),
      ]);

      if (userData !== null) {
        try {
          setIsLoading(true)
          const { data: userUpdate, error: userErr } = await supabase
            .from("users")
            .update({
              avatar_url: userData?.path,
            })
            .eq("id", values.userId)
            .select();
  
          if (!userErr) {
            setIsLoading(false)

            return userUpdate;
          } else {
            setIsLoading(false)
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
  });

  return {
    uploadAvatar,
    isLoading,
  };
};
