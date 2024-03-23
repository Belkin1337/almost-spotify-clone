import { UserCard } from "@/components/user/card/user-card"
import { FollowedPreviewTitle } from "./followed-preview-title"
import Image from "next/image"

interface ListPreviewProps {
  listLength: number,
}

export const FollowedPreview = ({
  listLength
}: ListPreviewProps) => {
  return (
    <div className="flex z-20 relative flex-col md:flex-row items-end gap-x-5 py-16 p-6">
      <div className="relative h-32 w-32 lg:h-56 lg:w-56">
        <Image
          fill
          src="/images/liked.png"
          alt="Collection/Followed"
          className="rounded-md object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-y-4 mt-4 md:mt-0">
        <FollowedPreviewTitle />
        <div className="flex items-center justify-start">
          <UserCard
            variant="miniauture"
            followed_length={listLength}
          />
        </div>
      </div>
    </div>
  )
}