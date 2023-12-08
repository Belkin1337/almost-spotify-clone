"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { useChangeLocale, useCurrentLocale, useScopedI18n } from '@/locales/client'

export const ChangeLang = () => {
  const changeLocale = useChangeLocale()
  const locale = useCurrentLocale()
  const langLocale = useScopedI18n('language')

  const currentLocale = () => {
    if(locale === 'ru') {
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
    // { 
    //  name: "SP", 
    //  onClick: () => changeLocale('sp'), 
    // },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <DropdownMenuLabel className="text-white text-[1rem]">{currentLocale()}</DropdownMenuLabel>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        <DropdownMenuGroup>
          {languages.map((item) => (
            <DropdownMenuItem key={item.fullname} onClick={item.onClick} className="flex items-start bg-neutral-950 text-[1.1rem] py-3 pr-6 pl-2 hover:bg-neutral-900 hover:transition">
              <button>
                {item.fullname}
              </button>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}