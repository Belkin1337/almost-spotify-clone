"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormMessage } from "@/ui/form"
import { Button } from "@/ui/button";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { signUpSchema } from "@/components/forms/auth/schemas/schema-sign-up";
import { FormFieldItem } from "@/ui/form-field";
import { useCallback } from "react";
import { Typography } from "@/ui/typography";
import { FaUserTag } from "react-icons/fa";
import { SignInForm } from "./sign-in-form";
import { Input } from "@/ui/input";
import { useSignUp } from "@/components/forms/auth/hooks/use-sign-up";

export type zodSignUpSchema = z.infer<typeof signUpSchema>;

export const SignUpForm = () => {
	const { openDialog } = useDialog()
	const { signUpMutation, error } = useSignUp();

	const form = useForm<zodSignUpSchema>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			full_name: "",
			email: "",
			password: ""
		},
	})

	const onSubmit = useCallback(async (
		values: zodSignUpSchema
	) => {
		await signUpMutation.mutateAsync({
			values: values
		});
	}, [signUpMutation])

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className={`w-[440px] space-y-6 p-8 bg-neutral-900 rounded-xl ${error && 'border border-red-500'}`}>
				<Typography>
					Регистрация
				</Typography>
				{error && <FormMessage>{error}</FormMessage>}
				<FormField
					control={form.control}
					name="full_name"
					render={({ field }) => (
						<FormFieldItem label="Имя" {...field}>
							<Input
								placeholder="Имя"
								name="full_name"
								autoComplete='false'
								autoCorrect='false'
							/>
						</FormFieldItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormFieldItem label="Почта" {...field}>
							<Input
								placeholder="Email"
								name="email"
								autoComplete='false'
								autoCorrect='false'
							/>
						</FormFieldItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormFieldItem label="Пароль" {...field}>
							<Input placeholder="Password" name="password"/>
						</FormFieldItem>
					)}
				/>
				<Button type="submit" variant="form" align="centered" background_color="default" rounded="medium">
					<Typography className="relative z-20">
						Зарегистрироваться
					</Typography>
				</Button>
				<div
					className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full"/>
				<div
					onClick={() => openDialog({ dialogChildren: <SignInForm/> })}
					className="flex items-center gap-x-2 cursor-pointer"
				>
					<FaUserTag size={18} className="text-neutral-400"/>
					<Typography variant="link">
						Авторизация
					</Typography>
				</div>
			</form>
		</Form>
	);
}