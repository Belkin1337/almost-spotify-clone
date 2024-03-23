"use client"

import { UserTips } from "@/components/tooltip/action"
import { useScopedI18n } from "@/locales/client"
import { 
  PiSpeakerSimpleHighThin, 
  PiSpeakerSimpleLowThin, 
  PiSpeakerSimpleSlashThin 
} from "react-icons/pi"

interface PlayerToggleVolumeProps {
  volume: number,
  mute: () => void,
  unmute: () => void,
}

export const PlayerToggleVolume = ({
  volume,
  mute,
  unmute
}: PlayerToggleVolumeProps) => {
  const playerLocale = useScopedI18n('main-service.main-part.config')

  return (
    <>
      {volume === 0 && (
        <UserTips action={playerLocale('player.unmute')}>
          <PiSpeakerSimpleSlashThin
            onClick={unmute}
            size={18}
            className="cursor-pointer text-neutral-400 hover:text-white"
          />
        </UserTips>
      )}
      {volume > 0 && Howler.volume() <= 0.7 && (
        <PiSpeakerSimpleLowThin
          onClick={mute}
          size={24}
          className="cursor-pointer text-neutral-400 hover:text-white"
        />
      )}
      {volume > 0.7 && (
        <UserTips action={playerLocale('player.mute')}>
          <PiSpeakerSimpleHighThin
            onClick={mute}
            size={18}
            className="cursor-pointer text-neutral-400 hover:text-white"
          />
        </UserTips>
      )}
    </>
  )
}