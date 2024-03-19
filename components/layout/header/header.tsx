"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { listComponents } from "@/content/lang/pages"
import { ChangeLang } from "@/features/change-lang"
import { useScopedI18n } from "@/locales/client"
import { Button } from "@/ui/button"
import { Sheet, SheetContent, SheetHeader } from "@/ui/sheet"
import Image from "next/image"
import Link from "next/link"

export const Header = () => {
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const router = useRouter();
  const header_locale = useScopedI18n('brand.main.const-components.header')
  const headers_list = listComponents(header_locale);

  return (
    <>
      <div className="fixed top-0 right-0 left-0 z-20 w-full backdrop-blur backdrop-filter bg-black/10 rounded-md">
        <div className="w-[95%] flex items-center justify-between h-[84px] mx-auto">
          <div onClick={() => router.push('/')} className="flex flex-row items-center gap-x-2 cursor-pointer">
            <Image
              width={46}
              height={46}
              alt="logo"
              loading="lazy"
              src="/images/logo.png"
              className="w-[46px] h-[46px]"
            />
            <p className="center font-bold text-[1rem]">
              Smotify
            </p>
          </div>
          <div className="hidden md:flex flex-row items-center justify-center w-1/3 gap-x-6">
            {headers_list.map((item, idx) => (
              <button onClick={() => router.push(item.route)} key={idx} className="font-bold text-[1rem] text-WHITE uppercase">
                {item.name}
              </button>
            ))}
          </div>
          <Button onClick={() => setSheetOpen(!sheetOpen)} className="md:hidden block">
            Navigation
          </Button>
          <div className="hidden md:flex items-center justify-start gap-x-4">
            <ChangeLang />
            <Link href="https://github.com/Belkin1337/smotify-service">
              <Image
                src="/icons/svg/github.svg"
                width={32}
                height={32}
                alt="Github Link"
                className="rounded-md bg-white p-2 fill-WHITE duration-300 hover:bg-white hover:shadow-linked hover:duration-300 hover:transition"
              />
            </Link>
          </div>
        </div>
      </div>
      <Sheet modal onOpenChange={setSheetOpen} open={sheetOpen}>
        <SheetContent className="h-screen w-[296px]">
          <SheetHeader>
            <div onClick={() => router.push('/')} className="flex flex-row items-center gap-x-2 cursor-pointer">
              <Image
                width={46}
                height={46}
                alt="logo"
                loading="lazy"
                src="/images/logo.png"
                className="w-[46px] h-[46px]"
              />
              <p className="center font-bold text-[1rem]">
                Smotify
              </p>
            </div>
          </SheetHeader>
          <div className="flex flex-col items-start">
            {headers_list.map((item, idx) => (
              <Link href={`${item.route}`} key={idx} className="font-bold text-[1rem] text-WHITE uppercase">
                {item.name}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}