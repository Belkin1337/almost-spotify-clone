"use client"

import qs from "query-string"
import { useState, useEffect } from "react"

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

export const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    const url = qs.stringifyUrl({
      url: "/home/search",
    })

    router.push(url);
  }, [router])

  return (
    <Input placeholder="Что сегодня вы хотите послушать?" value={value} onChange={(e) => setValue(e.target.value)}/>
  );
}