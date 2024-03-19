import Image from "next/image"

// impl artist playlist logic
interface ArtistPlaylistCardProps {
  // ...
}

export const ArtistPlaylistCard = () => {
  return (
    <div className="flex flex-col gap-2 rounded-md p-4 hover:bg-neutral-800 cursor-pointer">
      <Image
        src="/images/liked.png"
        alt="Song or playlist"
        width={400}
        height={400}
        className="w-[160px] h-[160px] object-cover rounded-md shadow-lg shadow-black"
      />
      <div className="flex flex-col">
        <p className="text-white font-semibold">
          Тест
        </p>
        <p className="text-neutral-400 text-sm">
          Исполнитель
        </p>
      </div>
    </div>
  )
}