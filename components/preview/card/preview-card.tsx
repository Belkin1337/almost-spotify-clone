import { Typography } from "@/ui/typography"

export const PreviewCard = ({ children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="flex flex-col items-center w-1/4 h-full">
      <div className="flex flex-col items-start gap-y-4">
        <Typography className="truncate">
          Предварительный результат
        </Typography>
        {children}
      </div>
    </div>
  )
}