
import { Song } from "@/types"
import { usePlayer } from "./use-player"
import { useUser } from "./use-user";
import { useAuthModal } from "./use-auth-modal";

export default function useOnPlay(songs: Song[]) {
  const player = usePlayer();
  const AuthModal = useAuthModal();
  const { user } = useUser();

  const onPlay = (id: string) => {
    if (!user) {
      return AuthModal.onOpen()
    }

    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  }

  return onPlay;
}