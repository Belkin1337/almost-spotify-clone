"use client"

import {
  useChangeLocale,
  useCurrentLocale,
  useScopedI18n
} from '@/locales/client'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger 
} from "@/ui/select"
import { Typography } from "@/ui/typography"

export const ChangeLang = () => {
  const changeLocale = useChangeLocale()
  const locale = useCurrentLocale()
  const langLocale = useScopedI18n('language')

  const currentLocale = () => {
    if (locale === 'ru') {
      return langLocale('ru');
    }

    if (locale === 'en') {
      return langLocale('en')
    }
  }

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
          <SelectItem
            value={item.fullname}
            key={item.fullname}
            onClick={item.onClick}
          >
            <Typography>
              {item.fullname}
            </Typography>
          </SelectItem>
        ))}
      </SelectContent>
    </Select >
  )
}