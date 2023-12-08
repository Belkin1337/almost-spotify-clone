import getSongs from '@/actions/get-songs';
import { Navbar } from '@/components/navbar/navbar'
import { ListItem } from '@/components/ui/list-item'
import { MainSongContent } from './components/main-song-content';

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();

  return (
    <div className="bg-DARK_SECONDARY_BACKGROUND rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Navbar>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">Добрый день!</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cold-3 2xl:grid-cols-4 gap-3 mt-4">
            <ListItem name="Любимые треки" image="/images/liked.png" href="/home/liked" />
          </div>
        </div>
      </Navbar>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Послушай это, пока в сети</h1>
        </div>
        <MainSongContent songs={songs} />
      </div>
    </div>
  )
}