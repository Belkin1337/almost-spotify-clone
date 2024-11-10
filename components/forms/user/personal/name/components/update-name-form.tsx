"use client"

import { USER_QUERY_KEY } from "@/lib/query/user/user-query";
import { useUpdateName } from "@/components/forms/user/personal/name/hooks/use-update-name";
import { Form } from "@/ui/form";
import { UserUpdateNameFormFields } from "./update-name-form-fields";
import { useCallback } from "react";
import { zodNameSchema } from "@/components/forms/user/personal/name/types/update-name-types";
import { UserEntity } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query"

export const UpdateNameForm = () => {
  const qc = useQueryClient()
  const user = qc.getQueryData<UserEntity>(USER_QUERY_KEY)
  const { uploadUserNameMutation, form } = useUpdateName();

  const onSubmit = useCallback(async (
    values: zodNameSchema
  ) => {
    try {
      await uploadUserNameMutation.mutateAsync({
        full_name: values.full_name,
        userId: user?.id
      });
    } catch (error) {
      throw error
    }
  }, [uploadUserNameMutation, user?.id])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-[560px] p-6">
        <UserUpdateNameFormFields
          form={form}
          isLoading={uploadUserNameMutation.isPending}
          user={user!}
        />
      </form>
    </Form>
  )
}