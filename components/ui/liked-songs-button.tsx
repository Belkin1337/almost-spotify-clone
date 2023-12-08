import { useRouter } from "next/navigation";

export const LikedSongsButton = () => {
  const router = useRouter();

  return (
    <div onClick={() => router.push('/home/liked')} className="flex flex-col md:flex-row items-start gap-x-3 p-2 cursor-pointer hover:bg-neutral-800/50 rounded-md">
      <img src="/images/liked.png" alt="Playlist" className="relative rounded-md h-[48px] w-[48px] object-cover" />
      <div className="flex flex-col mt-4 md:mt-0">
        <h1 className="text-white text-[1rem] font-semibold">Любимые треки</h1>
        <p className="text-neutral-400 text-[1rem] font-medium">Плейлист | 6 треков</p>
      </div>
    </div>
  );
}
