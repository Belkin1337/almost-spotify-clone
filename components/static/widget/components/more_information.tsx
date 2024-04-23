import { Button } from "@/ui/button"
import Link from "next/link"
import { Typography } from "@/ui/typography";

export const WidgetMoreBrandInfo = () => {
  return (
    <Link href="/about">
      <Button
        rounded="full"
        font="bold"
        className="px-4 py-2 hover:scale-[1.02]"
        background_color="black_90"
      >
        <Typography size="small" text_color="black" font="bold">
          Узнай больше о сервисе
        </Typography>
      </Button>
    </Link>
  )
}