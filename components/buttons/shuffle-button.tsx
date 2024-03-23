import { SongEntity } from "@/types/entities/song"
import { Button } from "@/ui/button"
import { Shuffle } from "lucide-react"

export const ShuffleButton = ({ 
  list
}: {
  list?: SongEntity[]
}) => {
  return (
    <Button size="md">
      <Shuffle
        size={48}
        className="hover:text-neutral-50 text-neutral-400"
      />
    </Button>
  )
}