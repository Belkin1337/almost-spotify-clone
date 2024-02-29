"use client"

import { useScopedI18n } from "@/locales/client"
import Image from "next/image"
import Link from "next/link"

export const Footer = () => {
  const footer_lang = useScopedI18n('brand.main.const-components.footer')

  return (
    <div className="relative w-full bg-black/90">
      <div className="flex flex-col h-[84px] md:flex-row items-center md:justify-between justify-center w-[95%] mx-auto">
        <div className="flex flex-row items-center justify-between gap-x-2 cursor-pointer">
          <Link href="https://pureawake.ru">
            <Image
              loading="lazy"
              width={42}
              height={42}
              alt="pureawake"
              src="/images/pureawake.png"
              className="w-[42px] h-[42px]"
            />
          </Link>
          <div className="center font-bold text-[1rem]">
            <p>dev/pureawake</p>
          </div>
        </div>
        <p className="text-neutral-400 text-[0.8rem] xl:text-[1.1rem]">
          {footer_lang('not-real-project')}
        </p>
      </div>
    </div>
  )
}