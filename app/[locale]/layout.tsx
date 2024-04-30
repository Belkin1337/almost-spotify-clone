"use client"

import { I18nProviderClient } from '@/locales/client'
import { Toaster } from '@/ui/toaster'
import QueryProvider from '@/providers/query-provider';
import dynamic from 'next/dynamic';
import { ReactNode } from "react";

const DialogProvider = dynamic(() => import("@/providers/dialog-provider")
	.then(mod => mod.DialogProvider))

const TooltipProvider = dynamic(() => import("@/ui/tooltip")
	.then(mod => mod.TooltipProvider))

export default function SubLayout({
	params: { locale },
	children
}: {
	params: { locale: string },
	children: ReactNode
}) {
	return (
		<QueryProvider>
			<I18nProviderClient locale={locale}>
				<TooltipProvider>
					<DialogProvider>
						<Toaster/>
						{children}
					</DialogProvider>
				</TooltipProvider>
			</I18nProviderClient>
		</QueryProvider>
	)
}