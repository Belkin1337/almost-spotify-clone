import { Sidebar } from '@/components/sidebar'
import { Player } from '@/components/player/player'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/ui/resizable';
import { SongWidget } from '@/components/song/widget';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/utils/supabase/server';
import { UserGeneric } from '@/types/entities/user';
import { MainPanel } from '@/components/layout/main-panel';

export default async function HomeLayout({
  children
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: {
    user
  } } = await supabase.auth.getUser()

  return (
    <>
      <ResizablePanelGroup direction="horizontal" className="flex max-h-screen bg-black">
        <ResizablePanel defaultSize={270} className="hidden md:flex min-w-[266px] h-screen max-w-[620px] flex-col gap-y-1 p-1">
          <Sidebar user={user as UserGeneric} />
        </ResizablePanel >
        <ResizableHandle />
        <ResizablePanel defaultSize={1260} className="relative overflow-hidden md:w-[1280px] md:min-w-[980px] p-1">
          <MainPanel user={user as UserGeneric} >
            {children}
          </MainPanel>
        </ResizablePanel>
        <ResizableHandle />
        <SongWidget user={user as UserGeneric} />
      </ResizablePanelGroup>
      <Player />
    </>
  )
}