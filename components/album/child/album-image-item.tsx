import { useLoadImage } from "@/lib/hooks/image/use-load-image";
import { AlbumEntity } from "@/types/entities/album";
import { Dialog, DialogContent, DialogTrigger } from "@/ui/dialog"
import { Skeleton } from "@/ui/skeleton";
import Image from "next/image"

export const AlbumImageItem = ({
  album
}: {
  album: AlbumEntity
}) => {
  const imageUrl = useLoadImage(album?.image_url!);

  if (!imageUrl) {
    return (
      <div>
        <Skeleton className="object-cover w-full h-full" />
      </div>
    )
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Image
            src={imageUrl || "/images/liked.png"}
            width={660}
            height={660}
            loading="lazy"
            alt={album?.title || "Album"}
            className="min-w-[224px] object-cover max-w-[224px] max-h-[224px] 
              rounded-md min-h-[224px] shadow-lg shadow-black 
              cursor-pointer hover:scale-[1.06] 
              hover:duration-100 duration-100"
          />
        </DialogTrigger>
        <DialogContent className="w-[660px] h-[660px] p-0 rounded-lg overflow-hidden">
          {imageUrl && (
            <Image
              src={imageUrl}
              width={660}
              height={660}
              loading="lazy"
              alt={album?.title || "Song"}
              className="w-full h-full object-cover"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}