"use client"

import { features } from "@/content/features"
import { useScopedI18n } from "@/locales/client"
import { Typography } from "@/ui/typography"

export const PreferencesList = () => {
  const settingsLocale = useScopedI18n('main-service.main-part.config')

  return (
    <div className="flex flex-col items-start w-full h-full px-4">
      <div className="flex flex-col items-start gap-y-4 w-full">
        <div className="flex flex-col gap-y-2 w-[60%]">
          {/* <p className="text-neutral-400 text-xl font-medium">
            {settingsLocale('appearance')}
          </p> */}
          {features(settingsLocale).map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between gap-x-6 w-full bg-neutral-800 p-2 rounded-md"
            >
              <div className="flex flex-col w-1/2">
                <Typography
                  size="large"
                  font="bold"
                  className="text-white text-lg"
                >
                  {item.attributes.name}
                </Typography>
                <Typography
                  size="md"
                  className="text-neutral-400"
                >
                  {item.attributes.description}
                </Typography>
              </div>
              {item.component}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}