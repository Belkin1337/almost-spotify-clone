"use client"

import { useUserQuery } from "@/lib/query/user/user-query";
import { useUpdateName } from "@/components/forms/user/personal/name/hooks/use-update-name";
import { Form } from "@/ui/form";
import { UserUpdateNameFormFields } from "./fields";
import { useCallback } from "react";
import { zodNameSchema } from "@/components/forms/user/personal/name/types/update-name-types";

export const UpdateNameForm = () => {
  const { data: user } = useUserQuery();
  const { uploadUserName, form } = useUpdateName();

  const onSubmit = useCallback(async (
    values: zodNameSchema
  ) => {
    try {
      await uploadUserName.mutateAsync({
        full_name: values.full_name,
        userId: user?.id
      });
    } catch (error) {
      throw error
    }
  }, [uploadUserName, user?.id])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-[560px] p-6">
        <UserUpdateNameFormFields
          form={form}
          isLoading={uploadUserName.isPending}
          user={user!}
        />
      </form>
    </Form>
  )
}