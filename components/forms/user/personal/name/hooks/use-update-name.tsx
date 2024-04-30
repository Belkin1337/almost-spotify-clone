import { useToast } from "@/lib/hooks/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { UserEntity } from "@/types/user";
import { userQueryKey } from "@/lib/querykeys/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateNameSchema } from "@/components/forms/user/personal/name/schemas/schema-update-name";
import { useUserQuery } from "@/lib/query/user/user-query";
import { Typography } from "@/ui/typography";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { useRouter } from "next/navigation";
import { UpdateAttributesType, zodNameSchema } from "@/components/forms/user/personal/name/types/update-name-types";

const supabase = createClient();

export const useUpdateName = () => {
  const { data: user } = useUserQuery();

  const queryClient = useQueryClient()

  const { toast } = useToast();
  const { closeDialog } = useDialog()
  const { refresh } = useRouter()

  const form = useForm<zodNameSchema>({
    resolver: zodResolver(updateNameSchema),
    defaultValues: {
      full_name: user?.full_name
    }
  })

  const uploadUserNameMutation = useMutation({
    mutationFn: async (
      values: UpdateAttributesType
    ) => {
      try {
        if (!values.full_name) return;

        const { data: userName,  error: userErr } = await supabase
          .from("users")
          .update({
            full_name: values.full_name
          })
          .eq("id", values.userId)
          .select()
        
          if (userErr) {
            toast({
              title: userErr.message,
              variant: "red"
            })
          } else if (userName && !userErr) {
            return userName as UserEntity[];
          }
      } catch (error) {
        throw error
      }
    },
    onSuccess: async (data ) => {
      if (data) {
        const user = data[0];

        toast({
          title: "Данные обновлены!",
          variant: "right",
          description: (
            <Typography className="!text-black">
              Изменения &gt; {user.full_name}
            </Typography>
          ),
        })

        closeDialog();
        refresh();

        return queryClient.invalidateQueries({ queryKey:
          userQueryKey
        })
      }
    },
    onError: () => {
      toast({
        title: "Не удалось обновить информацию.",
        variant: "red"
      })
    }
  })

  return { form, uploadUserNameMutation, }
}