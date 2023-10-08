import getSongs from '@/actions/getSongs';
import Header from '@/components/Header'
import ListItem from '@/components/ListItem'
import Image from 'next/image'
import PageContent from './components/PageContent';

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">Доброе время!</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cold-3 2xl:grid-cols-4 gap-3 mt-4">
            <ListItem
              name="Любимые треки"
              image="/images/liked.png"
              href="liked"
            />
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Послушай это, пока в сети</h1>
        </div>
        <PageContent songs={songs}/>
      </div>
    </div>
  )
}
