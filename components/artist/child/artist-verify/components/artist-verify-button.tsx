import { Typography } from '@/ui/typography';
import { LuBadgeCheck } from "react-icons/lu";

export const ArtistVerifyButton = () => {
  return (
    <div className="flex items-center gap-x-2">
      <LuBadgeCheck size={26} className="fill-blue-400 text-white border-none"/>
      <Typography size="small" font="medium" text_color="white">
        Verified Artist
      </Typography>
    </div>
  )
}