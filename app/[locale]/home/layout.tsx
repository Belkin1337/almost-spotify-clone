import { cookies } from 'next/headers';
import { createClient } from '@/lib/utils/supabase/server/supabase-server';
import { UserEntity } from '@/types/user';
import { ResizableHandle, ResizablePanelGroup } from "@/ui/resizable";
import { Sidebar } from "@/components/sidebar/sidebar";
import { MainPanel } from "@/components/layout/main-panel/main-panel";
import { SongWidget } from "@/components/layout/widget/song-widget";
import { PlayerItem } from "@/components/layout/player/player-item";
import { ReactNode } from "react";

export default async function HomeLayout({
	children
}: {
	children: ReactNode
}) {
	const supabase = createClient(cookies())

	const { data: { user } } = await supabase.auth.getUser()

	return (
		<>
			{/*<Debug/>*/}
			<ResizablePanelGroup direction="horizontal" className="flex gap-1 p-1 bg-black">
				<Sidebar user={user as UserEntity}/>
				<ResizableHandle/>
				<MainPanel user={user as UserEntity}>
					{children}
				</MainPanel>
				<ResizableHandle/>
				<SongWidget user={user as UserEntity}/>
			</ResizablePanelGroup>
			<PlayerItem user={user as UserEntity}/>
		</>
	)
}