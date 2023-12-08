"use client"

import UserContextProvider from "@/hooks/use-user";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserContextProvider>
      {children}
    </UserContextProvider>
  )
}