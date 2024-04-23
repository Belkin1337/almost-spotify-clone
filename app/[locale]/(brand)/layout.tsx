"use client"

import { Footer } from "@/components/layout/footer/footer"
import { Header } from "@/components/layout/header/header"
import { ReactNode } from "react";

export default function SubLayout({ 
  children 
}: { 
  children: ReactNode
}) {
  return (
    <div className="min-h-screen w-full bg-DARK_MAIN_BACKGROUND bg-opacity-25 bg-no-repeat">
      <Header />
        {children}
      <Footer />
    </div>
  )
}