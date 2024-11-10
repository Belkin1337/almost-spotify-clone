import { Button } from "@/ui/button"
import { ShuffleButtonType } from "@/components/song/child/song-shuffle-button/types/song-shuffle-button-types";
import { USER_QUERY_KEY } from "@/lib/query/user/user-query";
import { ShuffleIcon } from "@/ui/icons/shuffle-icon";
import { UserEntity } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query"

export const SongShuffleButton = ({
  song_list
}: ShuffleButtonType) => {
  const qc = useQueryClient()
  const user = qc.getQueryData<UserEntity>(USER_QUERY_KEY)

  return (
    <Button size="md" align="centered">
      <ShuffleIcon active={user?.attributes?.is_shuffle || false}/>
    </Button>
  )
}