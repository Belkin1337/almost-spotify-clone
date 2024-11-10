"use client"

import React from "react"
import { I18nProviderClient } from '@/locales/client'
import { Toaster } from '@/ui/toaster'
import QueryProvider from '@/providers/query-provider';
import dynamic from 'next/dynamic';
import { ReactNode } from "react";
import { PageTypes } from "@/types/page-convention";

const DialogProvider = dynamic(() =>
	import("@/providers/dialog-provider").then(mod => mod.DialogProvider)
)

const TooltipProvider = dynamic(() =>
	import("@/ui/tooltip").then(mod => mod.TooltipProvider)
)

type SubLayoutProps = PageTypes & {
	children: ReactNode
}

export default function SubLayout({
	params, children
}: SubLayoutProps) {
	const { locale } = React.use(params);
	
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