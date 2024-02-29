import { Sidebar } from '@/components/sidebar'
import { Player } from '@/components/player'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/ui/resizable';
import { Navbar } from '@/components/navbar';
import { SongWidget } from '@/components/song/widget';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/utils/supabase/server';
import { redirect } from 'next/navigation';
import { UserGeneric } from '@/types/entities/user';

export default async function HomeLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/')
  }

  return (
    <>
      <ResizablePanelGroup direction="horizontal" className="flex max-h-screen bg-black">
        <ResizablePanel defaultSize={270} className="hidden md:flex min-w-[246px] h-screen max-w-[620px] flex-col gap-y-2 p-1">
          <Sidebar user={user as UserGeneric}/>
        </ResizablePanel >
        <ResizableHandle />
        <ResizablePanel defaultSize={1260} className="relative overflow-hidden md:w-[1280px] md:min-w-[1280px] p-1">
          <Navbar user={user as UserGeneric} >
            {children}
          </Navbar>
        </ResizablePanel>
        <SongWidget />
      </ResizablePanelGroup>
      <Player />
    </>
  )
}