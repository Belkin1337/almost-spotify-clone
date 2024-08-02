"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormMessage } from "@/ui/form"
import { Button } from "@/ui/button";
import { signInSchema } from "@/components/forms/auth/schemas/schema-sign-in";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { FormFieldItem } from "@/ui/form-field";
import { Typography } from "@/ui/typography";
import { useCallback } from "react";
import { FiUserPlus } from "react-icons/fi";
import { SignUpForm } from "./sign-up-form";
import { Input } from "@/ui/input";
import { useSignIn } from "@/components/forms/auth/hooks/use-sign-in";

export type zodSignInSchema = z.infer<typeof signInSchema>

export const SignInForm = () => {
	const { openDialog } = useDialog()
	const { signInMutation, error } = useSignIn();

	const form = useForm<zodSignInSchema>({
		resolver: zodResolver(signInSchema),
		defaultValues: { email: "", password: "" },
	})

	const onSubmit = useCallback(async (values: zodSignInSchema) => {
		await signInMutation.mutateAsync({
			values: values
		});
	}, [signInMutation])

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className={`w-[460px] space-y-6 p-8 bg-neutral-900 rounded-xl ${error && 'border border-red-500'}`}>
				<Typography>
					Авторизация
				</Typography>
				{error && <FormMessage>{error}</FormMessage>}
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormFieldItem label="Почта" {...field}>
							<Input placeholder="Email" name="email"/>
						</FormFieldItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormFieldItem label="Пароль" {...field}>
							<Input
								type="password"
								placeholder="Password"
								name="password"
							/>
						</FormFieldItem>
					)}
				/>
				<Button type="submit" variant="form" align="centered" background_color="default" rounded="medium">
					<Typography className="relative z-20">
						Войти
					</Typography>
				</Button>
				<div
					className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full"/>
				<div
					onClick={() => openDialog({ dialogChildren: <SignUpForm/> })}
					className="flex items-center gap-x-2 cursor-pointer"
				>
					<FiUserPlus size={18} className="text-neutral-400"/>
					<Typography variant="link">
						Регистрация
					</Typography>
				</div>
			</form>
		</Form>
	);
}