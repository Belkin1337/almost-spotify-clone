"use client"

import { Header } from "@/components/header/header"
import { Footer } from "./[locale]/(brand)/components/header/footer"

export default function ErrorPage() {
  return (
    <>
      <Header />
      <div className="flex min-h-screen items-center flex-col">
        <p className="text-red-600 text-[4rem] uppercase">error то что вы искали здесь отсутствует.</p>
      </div>
      <Footer />
    </>
  )
}
