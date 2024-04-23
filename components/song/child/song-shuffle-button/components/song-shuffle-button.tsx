import { Button } from "@/ui/button"
import { ShuffleButtonType } from "@/components/song/child/song-shuffle-button/types/song-shuffle-button-types";
import { useUserQuery } from "@/lib/query/user/user-query";
import { ShuffleIcon } from "@/ui/icons/shuffle-icon";

export const SongShuffleButton = ({
  song_list
}: ShuffleButtonType) => {
  const { data: user } = useUserQuery();

  return (
    <Button size="md" align="centered">
      <ShuffleIcon active={user?.attributes?.is_shuffle || false}/>
    </Button>
  )
}