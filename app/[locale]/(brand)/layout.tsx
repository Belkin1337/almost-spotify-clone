"use client"

import { Footer } from "@/components/layout/footer/footer"
import { Header } from "@/components/layout/header/header"

export default function SubLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <div className="min-h-screen w-full bg-DARK_MAIN_BACKGROUND bg-opacity-25 bg-no-repeat">
      <Header />
        {children}
      <Footer />
    </div>
  )
}