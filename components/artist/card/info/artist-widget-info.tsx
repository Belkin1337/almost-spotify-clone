"use client"

import { artist_route } from "@/lib/constants/routes"
import { SongEntity } from "@/types/entities/song"
import { Dialog, DialogContent, DialogTrigger } from "@/ui/dialog"
import { Typography } from "@/ui/typography"
import { useRouter } from "next/navigation"
import Image from "next/image"

// impl artist info logic
interface ArtistInfoCardProps {
  // ...
}

export const ArtistWidgetCard = ({
  song
}: {
  song: SongEntity
}) => {
  const { push } = useRouter();

  return (
    <Dialog>
      <DialogTrigger className="flex items-start justify-start">
        <div className="flex flex-col items-start w-full rounded-lg overflow-hidden bg-neutral-800">
          <div className="flex flex-col h-[240px] w-full overflow-hidden p-4 bg-cover bg-center" style={{
            backgroundImage: `url("/images/juche.png")`
          }}>
            <div className="flex flex-col items-start">
              <p className="text-white text-lg font-bold">
                Об исполнителе
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-y-2 p-4">
            <p
              onClick={() => push(`${artist_route}/${song?.author}`)}
              className="hover:underline text-md cursor-pointer text-white font-bold truncate"
            >
              {song?.author}
            </p>
            <p className="text-left text-sm text-neutral-400 !font-medium whitespace-pre-wrap">
              Follow the future love story. Break the first law.
            </p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="flex flex-col p-0 w-[820px] overflow-hidden ">
        <div className="flex justify-center items-center bg-black overflow-hidden">
          <Image
            src="/images/juche.png"
            className="w-full max-w-min h-[420px] object-fill"
            alt="juche"
            width={600}
            height={600}
          />
        </div>
        <div className="flex items-start w-full pb-10 pt-4 px-6 overflow-y-auto h-full verflow-x-hidden">
          <div className="flex flex-col w-1/3 gap-y-6">
            <div className="flex flex-col gap-y-1">
              <Typography className="text-3xl text-white !font-bold">
                13,390
              </Typography>
              <Typography className="text-sm">
                followers
              </Typography>
            </div>
            <div className="flex flex-col gap-y-1">
              <Typography className="text-3xl text-white !font-bold">
                55,744
              </Typography>
              <Typography className="text-sm">
                monthly listeners
              </Typography>
            </div>
          </div>
          <div className="flex flex-col w-max">
            <Typography className="text-lg text-white !font-bold">
              Follow the future love story. Break the first law.
            </Typography>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}