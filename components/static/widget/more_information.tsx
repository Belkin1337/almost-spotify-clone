"use client"

import { Button } from "@/ui/button"
import Link from "next/link"

export const WidgetMoreBrandInfo = () => {
  return (
    <Link href="/about">
      <Button rounded="full" className="bg-white/90 text-black font-bold">
        <p className="text-sm">
          Узнай больше о сервисе
        </p>
      </Button>
    </Link>
  )
}