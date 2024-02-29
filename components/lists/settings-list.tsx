"use client"

import { ChangeLang } from "@/features/change-lang"
import { useScopedI18n } from "@/locales/client"

export const SettingsList = () => {
  const settingsLocale = useScopedI18n('main-service.main-part.config')

  return (
    <div className="flex flex-col items-start w-full h-full px-4">
      <div className="flex flex-col items-start gap-y-8">
        <div className="flex flex-col gap-y-2">
          <p className="text-neutral-400 text-xl font-medium">
            {settingsLocale('appearance')}
          </p>
          <div className="flex items-center gap-x-2">
            <p className="text-white text-xl font-medium">
              {settingsLocale('theme')}
            </p>
            <div className="bg-neutral-700 rounded-md">
              <p>
                {settingsLocale('error.is-not-available')}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="text-neutral-400 text-xl font-medium">
            {settingsLocale('account')}
          </p>
          <div className="flex items-center gap-x-2">
            <p className="text-white text-xl font-medium">
              {settingsLocale('language')}
            </p>
            <div className="bg-neutral-700 rounded-md">
              <ChangeLang />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}