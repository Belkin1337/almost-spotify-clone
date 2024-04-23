"use client"

import {
  useChangeLocale,
  useCurrentLocale,
  useScopedI18n
} from '@/locales/client'
import { Button } from '@/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from "@/ui/select"
import { Typography } from "@/ui/typography"
import { useCallback } from 'react'
import { CheckedIcon } from "@/ui/icons/checked";

export const ChangeLang = () => {
  const changeLocale = useChangeLocale()
  const locale = useCurrentLocale()
  const langLocale = useScopedI18n('language')

  const currentLocale = useCallback(() => {
    if (locale === 'ru') {
      return langLocale('ru');
    } else if (locale === 'en') {
      return langLocale('en')
    }

    return langLocale('en')
  }, [langLocale, locale])

  const languages = [
    {
      name: "RU",
      fullname: langLocale('ru'),
      onClick: () => changeLocale('ru'),
    },
    {
      name: "EN",
      fullname: langLocale('en'),
      onClick: () => changeLocale('en'),
    },
  ]

  return (
    <Select>
      <SelectTrigger className="w-[40%]">
        <div className="text-white text-[1rem]">
          {currentLocale()}
        </div>
      </SelectTrigger>
      <SelectContent className="p-0">
        {languages.map((item) => (
          <Button
            key={item.fullname}
            onClick={item.onClick}
            rounded="medium"
            className="flex items-center justify-between w-full p-2 hover:bg-neutral-800"
          >
            <Typography>
              {item.fullname}
            </Typography>
            {item.name === currentLocale() && (
              <CheckedIcon/>
            )}
          </Button>
        ))}
      </SelectContent>
    </Select >
  )
}