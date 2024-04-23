import { ReactNode } from "react";

export const PreviewCard = ({ children
}: {
  children: ReactNode
}) => {
  return (
    <div className="flex lg:flex-row flex-col w-fit p-4 h-full">
      {children}
    </div>
  )
}