import { cookies } from 'next/headers';
import { createClient } from '@/lib/utils/supabase/server/supabase-server';
import { UserEntity } from '@/types/user';
import { PlayerItem } from "@/components/layout/player/player-item";
import { ReactNode } from "react";
import { Debug } from "@/components/layout/debug";
import { MainResizableLayout, RESIZABLE_COOKIE_ITEM } from "@/components/layout/main-resizalbe-layout";

export default async function HomeLayout({
	children
}: {
	children: ReactNode
}) {
	const supabase = createClient(cookies())
	const { data: { user } } = await supabase.auth.getUser()

	const layout = cookies().get(RESIZABLE_COOKIE_ITEM);

	let defaultLayout;

	if (layout) defaultLayout = JSON.parse(layout.value);

	return (
		<>
			<Debug user={user as UserEntity}/>
			<MainResizableLayout user={user as UserEntity} defaultLayout={defaultLayout}>
				{children}
			</MainResizableLayout>
			<PlayerItem user={user as UserEntity}/>
		</>
	)
}