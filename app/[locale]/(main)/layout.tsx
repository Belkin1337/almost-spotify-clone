import { cookies } from 'next/headers';
import { UserEntity } from '@/types/user';
import { PlayerItem } from "@/components/layout/player/player-item";
import { ReactNode } from "react";
import { Debug } from "@/components/layout/debug";
import { MainResizableLayout, RESIZABLE_COOKIE_ITEM } from "@/components/layout/main-resizalbe-layout";
import { getUser } from "@/lib/helpers/get-user";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { USER_QUERY_KEY } from "@/lib/query/user/user-query";
import { getUserById } from "@/lib/query/user/get-user";

export default async function HomeLayout({
	children
}: { children: ReactNode }) {
	const user = await getUser({ withValidation: false })
	
	const cookieStore = await cookies()
	const layout = cookieStore.get(RESIZABLE_COOKIE_ITEM);
	
	const qc = new QueryClient()
	
	if (user) {
		await qc.prefetchQuery({
			queryKey: USER_QUERY_KEY,
			queryFn: () => getUserById(user.id)
		})
	}
	
	let defaultLayout;
	
	if (layout) defaultLayout = JSON.parse(layout.value);

	const dehydratedState = dehydrate(qc)
	
	return (
		<HydrationBoundary state={dehydratedState}>
			<Debug/>
			<MainResizableLayout defaultLayout={defaultLayout}>
				{children}
			</MainResizableLayout>
			<PlayerItem/>
		</HydrationBoundary>
	)
}