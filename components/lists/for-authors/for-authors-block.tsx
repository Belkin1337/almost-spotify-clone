"use client"

import { twMerge } from "tailwind-merge";
import { HTMLAttributes } from "react";
import { useRouter } from "next/navigation";

interface AuthorsModule
	extends HTMLAttributes<HTMLDivElement> {
	route: string
}

export const ForAuthorsModule = ({
	route,
	className,
	...props
}: AuthorsModule) => {
	const { push } = useRouter();

	return (
		<div
			onClick={() => push(route)}
			className={twMerge(`flex items-center hover:bg-neutral-700 cursor-pointer justify-center w-full 
			bg-neutral-800 border border-neutral-700 rounded-lg`,
				className)}
				 {...props}
		/>
	)
}