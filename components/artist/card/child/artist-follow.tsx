import { Button } from "@/ui/button"
import { Typography } from "@/ui/typography"

export const ArtistFollowButton = () => {
  return (
    <Button
      className="px-6 py-3 bg-transparent group border hover:scale-[1.06] rounded-full 
    hover:border-white border-neutral-700 flex items-center justify-center"
    >
      <Typography className="group-hover:scale-[1.02] text-sm">
        Following
      </Typography>
    </Button>
  )
}