"use client"

import { Button } from "@/ui/button"
import { SignInForm } from "./sign-in"
import { useDialog } from "@/lib/hooks/ui/use-dialog"
import { SignUpForm } from "./sign-up"
import { ReactElement, useCallback } from "react"
import { Typography } from "@/ui/typography"
import { useUserQuery } from "@/lib/query/user/user-query";

export const AuthForm = () => {
	const { data: user } = useUserQuery();
	const { openDialog } = useDialog()

	const handleDialogForm = useCallback((element: ReactElement) => {
		if (!user) {
			openDialog({
				dialogChildren: element
			})
		}
	}, [openDialog, user])

	return (
		<div className="flex flex-col gap-y-4 p-6 w-[400px] h-fit">
			<Typography>
				Вход в аккаунт
			</Typography>
			<Button
				className="w-full h-min bg-jade-600"
				rounded="medium"
				onClick={() => handleDialogForm(<SignInForm/>)}
			>
				<Typography className="text-white font-semibold">
					Уже есть аккаунт / Вход
				</Typography>
			</Button>
			<Button
				className="w-full h-min bg-white"
				rounded="medium"
				onClick={() => handleDialogForm(<SignUpForm/>)}
			>
				<Typography className="!text-neutral-900 font-semibold">
					Нет аккаунта / Регистрация
				</Typography>
			</Button>
		</div>
	)
}