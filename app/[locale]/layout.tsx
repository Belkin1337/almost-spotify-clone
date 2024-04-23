"use client"

import { I18nProviderClient } from '@/locales/client'
import { Toaster } from '@/ui/toaster'
import { TooltipProvider } from '@/ui/tooltip';
import QueryProvider from '@/providers/query-provider';
import dynamic from 'next/dynamic';
import React from "react";

const DialogProvider = dynamic(() => import("@/providers/dialog-provider")
	.then(mod => mod.DialogProvider))

export default function SubLayout({
	params: { locale },
	children
}: {
	params: { locale: string },
	children: React.ReactNode
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