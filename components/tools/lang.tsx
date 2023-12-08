"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useChangeLocale, useCurrentLocale } from '@/locales/client'

interface LanguageProps {
  name: string,
  onClick: (name: string) => void
}

export const ChoiceLang = () => {
  const changeLocale = useChangeLocale()
  const locale = useCurrentLocale()

  const languages = [
    {
      name: "RU",
      onClick: () => changeLocale('ru'),
    },
    {
      name: "EN",
      onClick: () => changeLocale('en'),
    },
    {
      name: "SP",
      onClick: () => changeLocale('sp'),
    },
  ]

  return (
    <Select>
      <SelectTrigger className="w-[80px]">
        <SelectValue placeholder={locale} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Change locale</SelectLabel>
          <SelectItem value="ru">
            <button onClick={() => changeLocale('ru')}>RU</button>
          </SelectItem>
          <SelectItem value="en">
            <button onClick={() => changeLocale('en')}>EN</button>
          </SelectItem>
          <SelectItem value="sp">
            <button onClick={() => changeLocale('sp')}>SP</button>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}