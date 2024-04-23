import { VolumeSlider } from "./volume-slider"
import { PlayerToggleVolume } from "./player-toggle-volume"
import { useVolume } from "@/components/player/controls/hooks/use-volume";
import { PlayerFullscreenControls } from "@/components/player/controls/components/player-fullscreen";
import { NowPlayingView } from "@/components/player/controls/components/now-playing-view";
import { LyricsView } from "@/components/player/controls/components/lyrics-view";

export const PlayerVolumeControls = () => {
  const { volume, mute, unmute, setVolume } = useVolume();

  return (
    <div className="hidden md:flex items-center gap-x-4 w-[30%] h-full justify-end">
      <NowPlayingView/>
      <LyricsView />
      <div className="flex items-center gap-x-2 w-[130px]">
        <PlayerToggleVolume
          mute={mute}
          unmute={unmute}
          volume={volume || 0}
        />
        <VolumeSlider
          value={volume || 0}
          onValueChange={(value: number[]) => {
            setVolume(value[0])
          }}
        />
      </div>
      <PlayerFullscreenControls />
    </div>
  )
}