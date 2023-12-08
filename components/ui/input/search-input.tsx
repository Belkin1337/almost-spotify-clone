"use client"

import qs from "query-string"
import { useState, useEffect } from "react"

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useScopedI18n } from "@/locales/client";

export const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const searchLocale = useScopedI18n('main-service.pages.search-content')

  useEffect(() => {
    const url = qs.stringifyUrl({
      url: "/home/search",
    })

    router.push(url);
  }, [router])

  return (
    <Input placeholder={searchLocale('navbar.input-message')} value={value} onChange={(e) => setValue(e.target.value)}/>
  );
}