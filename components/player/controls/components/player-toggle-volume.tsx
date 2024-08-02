import { UserTips } from "@/components/tooltip/components/action"
import { useScopedI18n } from "@/locales/client"
import { PiSpeakerMid } from "@/ui/icons/pi-speaker-mid";
import { PiSpeakerHigh } from "@/ui/icons/pi-speaker-high";
import { PiSpeakerSlash } from "@/ui/icons/pi-speaker-slash";

interface IPlayerToggleVolume {
  mute: () => void,
  unmute: () => void,
  volume: number,
}

export const PlayerToggleVolume = ({
  volume, mute, unmute
}: IPlayerToggleVolume) => {
  const playerLocale = useScopedI18n('main-service.main-part.config')

  return (
    <>
      {volume === 0 && (
        <UserTips action={playerLocale('player.unmute')}>
          <PiSpeakerSlash onClick={unmute}/>
        </UserTips>
      )}
      {(volume > 0 && volume <= 0.7) && (
        <PiSpeakerMid onClick={mute} />
      )}
      {volume > 0.7 && (
        <UserTips action={playerLocale('player.mute')}>
          <PiSpeakerHigh onClick={mute}/>
        </UserTips>
      )}
    </>
  )
}