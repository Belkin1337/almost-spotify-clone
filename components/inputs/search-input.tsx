"use client"

import qs from "querystring"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { Input } from "@/ui/input";
import { useScopedI18n } from "@/locales/client";

export const SearchInput = () => {
  const [value, setValue] = useState<string>('');
  const { push } = useRouter();

  useEffect(() => {
    if (value) {
      const url = qs.stringify({ title: `${value}`})
  
      push(`search/?` + url)
    } else {
      push(`search/`)
    }
  }, [push, value])

  const searchLocale = useScopedI18n('main-service.pages.search-content')

  return (
    <Input
      placeholder={searchLocale('navbar.input-message')}
      value={value}
      className="w-[280px] rounded-full"
      onChange={(e) => {
        setValue(e.target.value)
      }}
    />
  );
}